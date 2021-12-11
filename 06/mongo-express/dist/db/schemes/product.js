"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, default: 0 },
    description: String,
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }
});
const Products = (0, mongoose_1.model)('product', schema);
exports.default = Products;
