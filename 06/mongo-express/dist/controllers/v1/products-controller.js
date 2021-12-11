"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const product_1 = __importDefault(require("../../db/schemes/product"));
const mongoose_1 = require("mongoose");
const getProducts = async (req, res) => {
    const products = await product_1.default.find().select({ password: 0, __v: 0 });
    res.send(products);
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    const productId = req.params.productId;
    const product = await product_1.default.findById(productId).select({ __v: 0 });
    if (product) {
        res.send(product);
    }
    else {
        res.status(404).send({});
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const { name, year, price, description, user } = req.body;
        const newProduct = await product_1.default.create({
            name,
            year,
            price,
            description,
            user
        });
        console.log(newProduct);
        res.send(newProduct);
    }
    catch (e) {
        if (e instanceof mongoose_1.mongo.MongoError) {
            res.status(400).send({
                code: e.code,
                message: e.code === 11000 ? 'duplicated value' : 'error',
                labels: e.errorLabels,
            });
        }
    }
};
exports.createProduct = createProduct;
