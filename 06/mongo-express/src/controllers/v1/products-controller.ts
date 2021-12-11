import { Request, Response } from 'express';
import Products from '../../db/schemes/product';
import { mongo } from 'mongoose';

export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await Products.find().select({ password: 0, __v: 0 });
  res.send(products);
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const productId = req.params.productId;
  const product = await Products.findById(productId).select({ __v: 0 });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({});
  }
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, year, price, description,user } = req.body;
    const newProduct = await Products.create({
      name,
      year,
      price,
      description,
      user
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
