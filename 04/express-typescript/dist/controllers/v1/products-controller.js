"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.partialUpdateProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const productsJson = require('../../utils/products.json');
const products_1 = require("../../data/products");
let productList;
const getProducts = (req, res) => {
    const itemsPerPage = 6;
    const page = parseInt(req.query.page);
    productsJson.page = page;
    productsJson.total = productsJson.data.length;
    productsJson.data = productsJson.data.slice();
    productsJson.total_pages = Math.ceil(productsJson.data.length / itemsPerPage);
    res.send(productsJson);
};
exports.getProducts = getProducts;
const getProductById = (req, res) => {
    const productId = parseInt(req.params.productId);
    const index = products_1.productsData.findIndex((item) => item.id == productId);
    if (index !== -1) {
        res.send({ data: products_1.productsData[index] });
    }
    else {
        res.status(404).send({});
    }
};
exports.getProductById = getProductById;
const createProduct = (req, res) => {
    const { name, year, color, pantone_value } = req.body;
    const newProduct = {
        id: products_1.productsData.length + 1,
        name,
        year,
        color,
        pantone_value,
    };
    products_1.productsData.push(newProduct);
    res.send(newProduct);
};
exports.createProduct = createProduct;
const updateProduct = (req, res) => {
    const id = parseInt(req.params.productId);
    const { name, year, color, pantone_value } = req.body;
    const index = products_1.productsData.findIndex((item) => item.id == id);
    if (index !== -1) {
        console.log(index);
        products_1.productsData[index] = {
            id,
            name,
            year,
            color,
            pantone_value,
        };
        res.send({ data: productsJson.data[index] });
    }
    else {
        res.status(404).send({});
    }
};
exports.updateProduct = updateProduct;
const partialUpdateProduct = (req, res) => {
    const productId = parseInt(req.params.productId);
    const { name, year, color, pantone_value } = req.body;
    const index = products_1.productsData.findIndex((item) => item.id == productId);
    if (index !== -1) {
        const product = products_1.productsData[index];
        products_1.productsData[index] = {
            id: product.id,
            name: name || product.name,
            year: year || product.year,
            color: color || product.color,
            pantone_value: pantone_value || product.pantone_value,
        };
        res.send({ data: productsJson.data[index] });
    }
    else {
        res.status(404).send({});
    }
};
exports.partialUpdateProduct = partialUpdateProduct;
const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.productId);
    const index = products_1.productsData.findIndex((item) => item.id == productId);
    if (index !== -1) {
        productList = products_1.productsData.splice(index, 1);
        console.log(productList);
        res.send({});
    }
    else {
        res.status(404).send({});
    }
};
exports.deleteProduct = deleteProduct;
