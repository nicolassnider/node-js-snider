import { Request, Response } from 'express';
import Products from '../../db/schemes/product';
import { mongo } from 'mongoose';
import { Types } from 'mongoose';
import { sendError, validateObjectId } from '../../utils/response_utils';

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const itemsPerPage: number = 3;
  const page: number = parseInt(req.query.page as string);
  const start = (page - 1) * itemsPerPage;
  const total: number = await Products.count();

  const products = await Products.find({
    user: new Types.ObjectId(req.session.userId),
  })
  .skip(start)
  .limit(itemsPerPage);
  res.send({
    page: page,
    per_page: itemsPerPage,
    total: total,
    total_pages: Math.ceil(total / itemsPerPage),
    data: products,
  });
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    validateObjectId(productId);
    const product = await Products.findOne(
      {
        _id:productId,
        user:new Types.ObjectId(req.session.userId),
      }
      ).populate({
      path:"user",
      select:{
        "password":0,
        "__v":0
      }
    });

    if (product) {
      res.send({ data: product });
    } else {
      res.status(404).send({});
    }
  } catch (e:unknown) {
    sendError(res, "s");
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {userId} = req.session;
    const { name, year, price, description} = req.body;
    validateObjectId(userId);
    const newProduct = await Products.create({
      name,
      year,
      price,
      description,
      user:userId,
    });
    console.log(newProduct);
    res.send(newProduct);
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

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id: string = req.params.productId;
  const { name, year, description, price  } = req.body;
  const updatedProduct = Products.findOneAndUpdate(
    {
      _id:id,
      user: req.session.userId
    }, {
    name,
    year,
    description,
    price,
    user:req.session.userId    
  });

  if (updatedProduct) {
    res.send({ data: updatedProduct });
  } else {
    res.status(404).send({});
  }
};

export const partialUpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = req.params.productId;
  const { name, year, description, price } = req.body;
  const product = await Products.findOne({
    _id:productId,
    user:req.session.userId
  });
  if (product) {
    product.name = name || product.name;
    product.year = year || product.year;
    product.description = description || product.description;
    product.price = price || product.price;
    await product.save();

    res.send({ data: product });
  } else {
    res.status(404).send({});
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productId: string = req.params.productId;

    validateObjectId(productId);

    const deleted = await Products.deleteOne({
      _id: productId,
      user: req.session.userId
    });

    if (deleted.deletedCount > 0) {
      res.send({});
    } else {
      res.status(404).send({});
    }
  } catch (e) {
    sendError(res, e);
  }
};
