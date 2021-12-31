"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.partialUpdateProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const product_1 = __importDefault(require("../../db/schemes/product"));
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const response_utils_1 = require("../../utils/response_utils");
const getProducts = async (req, res) => {
    const itemsPerPage = 3;
    const page = parseInt(req.query.page);
    const start = (page - 1) * itemsPerPage;
    const total = await product_1.default.count();
    const products = await product_1.default.find().skip(start).limit(itemsPerPage);
    res.send({
        page: page,
        per_page: itemsPerPage,
        total: total,
        total_pages: Math.ceil(total / itemsPerPage),
        data: products,
    });
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        (0, response_utils_1.validateObjectId)(productId);
        const product = await product_1.default.findById(productId).populate({
            path: "user",
            select: {
                "password": 0,
                "__v": 0
            }
        });
        if (product) {
            res.send({ data: product });
        }
        else {
            res.status(404).send({});
        }
    }
    catch (e) {
        (0, response_utils_1.sendError)(res, "s");
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
            user,
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
const updateProduct = async (req, res) => {
    const id = req.params.productId;
    const { name, year, description, price, user } = req.body;
    const updatedProduct = product_1.default.findByIdAndUpdate(id, {
        name,
        year,
        description,
        price,
        user,
    });
    if (updatedProduct) {
        res.send({ data: updatedProduct });
    }
    else {
        res.status(404).send({});
    }
};
exports.updateProduct = updateProduct;
const partialUpdateProduct = async (req, res) => {
    const productId = req.params.productId;
    const { name, year, description, price, user } = req.body;
    const product = await product_1.default.findById(productId);
    if (product) {
        product.name = name || product.name;
        product.year = year || product.year;
        product.description = description || product.description;
        product.price = price || product.price;
        product.user = user || product.user;
        await product.save();
        res.send({ data: product });
    }
    else {
        res.status(404).send({});
    }
};
exports.partialUpdateProduct = partialUpdateProduct;
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        (0, response_utils_1.validateObjectId)(productId);
        const deleted = await product_1.default.deleteOne({
            _id: new mongoose_2.Types.ObjectId(productId),
        });
        if (deleted.deletedCount > 0) {
            res.send({});
        }
        else {
            res.status(404).send({});
        }
    }
    catch (e) {
        (0, response_utils_1.sendError)(res, e);
    }
};
exports.deleteProduct = deleteProduct;
