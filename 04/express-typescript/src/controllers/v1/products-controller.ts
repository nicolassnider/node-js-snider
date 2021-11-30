// eslint-disable-next-line @typescript-eslint/no-var-requires
const productsJson = require('../../utils/products.json');
import { Request, Response } from 'express';
import { productsData, Product } from '../../data/products';
let productList: Product[];

const getProducts = (req: Request, res: Response): void => {
  const itemsPerPage: number = 6;
  const page: number = parseInt(req.query.page as string);
  productsJson.page = page;
  productsJson.total = productsJson.data.length;
  productsJson.data = productsJson.data.slice();
  productsJson.total_pages = Math.ceil(productsJson.data.length / itemsPerPage);
  res.send(productsJson);
};

const getProductById = (req: Request, res: Response): void => {
  const productId: number = parseInt(req.params.productId);
  const index: number = productsData.findIndex((item) => item.id == productId);
  if (index !== -1) {
    res.send({ data: productsData[index] });
  } else {
    res.status(404).send({});
  }
};

const createProduct = (req: Request, res: Response): void => {
  const { name, year, color, pantone_value }: Product = req.body;
  const newProduct: Product = {
    id: productsData.length + 1,
    name,
    year,
    color,
    pantone_value,
  };
  productsData.push(newProduct);
  res.send(newProduct);
};

const updateProduct = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.productId);
  const { name, year, color, pantone_value }: Product = req.body;
  const index: number = productsData.findIndex((item) => item.id == id);
  if (index !== -1) {
    console.log(index);
    productsData[index] = {
      id,
      name,
      year,
      color,
      pantone_value,
    };
    res.send({ data: productsJson.data[index] });
  } else {
    res.status(404).send({});
  }
};

const partialUpdateProduct = (req: Request, res: Response): void => {
  const productId: number = parseInt(req.params.productId);
  const { name, year, color, pantone_value }: Product = req.body;
  const index: number = productsData.findIndex((item) => item.id == productId);
  if (index !== -1) {
    const product = productsData[index];
    productsData[index] = {
      id: product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value,
    };
    res.send({ data: productsJson.data[index] });
  } else {
    res.status(404).send({});
  }
};

const deleteProduct = (req: Request, res: Response): void => {
  const productId = parseInt(req.params.productId);
  const index: number = productsData.findIndex((item) => item.id == productId);
  if (index !== -1) {
    productList = productsData.splice(index, 1);
    console.log(productList);
    res.send({});
  } else {
    res.status(404).send({});
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  partialUpdateProduct,
  deleteProduct,
};
