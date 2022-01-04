"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkAuth = (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            throw new Error('Missing header token');
        }
        const { userId, email } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.session = { userId: userId, email: email };
        next();
    }
    catch (error) {
        res.status(403).send(error);
    }
};
exports.checkAuth = checkAuth;
