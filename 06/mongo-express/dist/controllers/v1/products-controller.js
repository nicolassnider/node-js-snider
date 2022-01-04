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
    const products = await product_1.default.find({
        user: new mongoose_2.Types.ObjectId(req.session.userId),
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
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        (0, response_utils_1.validateObjectId)(productId);
        const product = await product_1.default.findOne({
            _id: productId,
            user: new mongoose_2.Types.ObjectId(req.session.userId),
        }).populate({
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
        const { userId } = req.session;
        const { name, year, price, description } = req.body;
        (0, response_utils_1.validateObjectId)(userId);
        const newProduct = await product_1.default.create({
            name,
            year,
            price,
            description,
            user: userId,
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
    const { name, year, description, price } = req.body;
    const updatedProduct = product_1.default.findOneAndUpdate({
        _id: id,
        user: req.session.userId
    }, {
        name,
        year,
        description,
        price,
        user: req.session.userId
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
    const { name, year, description, price } = req.body;
    const product = await product_1.default.findOne({
        _id: productId,
        user: req.session.userId
    });
    if (product) {
        product.name = name || product.name;
        product.year = year || product.year;
        product.description = description || product.description;
        product.price = price || product.price;
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
            _id: productId,
            user: req.session.userId
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
