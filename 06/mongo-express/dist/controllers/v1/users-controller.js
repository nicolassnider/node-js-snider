"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const user_1 = __importDefault(require("../../db/schemes/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = require("mongoose");
const response_utils_1 = require("../../utils/response_utils");
const product_1 = __importDefault(require("../../db/schemes/product"));
const getUsers = async (req, res) => {
    const users = await user_1.default.find().select({ password: 0, __v: 0 });
    res.send(users);
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    const userId = req.params.userId;
    const user = await user_1.default.findById(userId).select({ password: 0, __v: 0 });
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send({});
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const { email, first_name, last_name, avatar, password } = req.body;
        const hash = await bcrypt_1.default.hash(password, 15);
        const newUser = await user_1.default.create({
            email,
            first_name,
            last_name,
            avatar,
            password: hash,
        });
        console.log(newUser);
        res.send(newUser);
    }
    catch (e) {
        if (e instanceof mongoose_1.mongo.MongoError) {
            res
                .status(400)
                .send({
                code: e.code,
                message: e.code === 11000 ? 'duplicated value' : 'error',
                labels: e.errorLabels,
            });
        }
    }
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    try {
        const { userID } = req.params;
        (0, response_utils_1.validateObjectId)(userID);
        const deleted = await user_1.default.findByIdAndDelete(userID);
        if (deleted) {
            product_1.default.deleteMany({ user: deleted._id });
            res.send('deleted');
        }
        else {
            res.status(404).send({});
        }
    }
    catch (e) {
        (0, response_utils_1.sendError)(res, e);
    }
};
exports.deleteUser = deleteUser;
