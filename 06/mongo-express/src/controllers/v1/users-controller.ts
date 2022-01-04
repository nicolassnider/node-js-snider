/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import Users, { User } from '../../db/schemes/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mongo } from 'mongoose';
import { sendError, validateObjectId } from '../../utils/response_utils';
import Products from '../../db/schemes/product';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const users = await Users.find().select({ password: 0, __v: 0 });
  res.send(users);
};

export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.userId;
  const user = await Users.findById(userId).select({ password: 0, __v: 0 });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({});
  }
};

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, first_name, last_name, avatar, password } = req.body;
    const hash: string = await bcrypt.hash(password, 15);
    const newUser = await Users.create({
      email,
      first_name,
      last_name,
      avatar,
      password: hash,
    });
    console.log(newUser);
    res.send(newUser);
  } catch (e) {
    if (e instanceof mongo.MongoError) {
      res.status(400).send({
        code: e.code,
        message: e.code === 11000 ? 'duplicated value' : 'error',
        labels: e.errorLabels,
      });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userID } = req.params;
    validateObjectId(userID);
    const deleted = await Users.findByIdAndDelete(userID);
    if (deleted) {
      Products.deleteMany({ user: deleted._id });
      res.send('deleted');
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user: User | null = await Users.findOne({ email });
    if (!user) {
      throw { code: 404, message: 'User not found' };
    }
    const isOk: boolean = await bcrypt.compare(password, user.password);
    if (!isOk) {
      throw { code: 401, message: 'Invalid password' };
    }

    const expiresIn = 60 * 60;

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn,
      }
    );

    res.send({ token: token, expiresIn: expiresIn });
  } catch (error) {
    sendError(res, error);
  }
};
