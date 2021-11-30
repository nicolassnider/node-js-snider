import {Request,Response} from 'express'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const users = require('../../utils/users.json');
import { usersData } from '../../data/users';

const getUsers = (req:Request, res:Response):void => {
  res.send(users);
};

const getUserById = (req:Request, res:Response):void => {
  const userId = parseInt(req.params.userId);
  const index = usersData.findIndex((item) => item.id == userId);
  if (index !== -1) {
    res.send({ data: usersData[index] });
  } else {
    res.status(404).send({});
  }
};

export{
  getUsers,
  getUserById
}