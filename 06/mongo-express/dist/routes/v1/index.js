"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user-routes"));
const product_routes_1 = __importDefault(require("./product-routes"));
const createRoutesV1 = (app) => {
    app.use('/api/v1/users', user_routes_1.default);
    app.use('/api/v1/products', product_routes_1.default);
};
exports.default = createRoutesV1;
