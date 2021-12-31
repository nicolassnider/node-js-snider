"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.validateObjectId = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
const { MongoError } = mongoose_1.mongo;
const validateObjectId = (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id)) {
        throw { code: 400, message: `Invalid objectId ${id}` };
    }
};
exports.validateObjectId = validateObjectId;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const sendError = (res, e) => {
    if (e instanceof MongoError) {
        res.status(400).send({
            code: e.code,
            message: e.code === 11000 ? 'Duplicated value' : 'error',
        });
        return;
    }
    const statusCode = e.code || 500;
    res.status(statusCode).send(e.message);
};
exports.sendError = sendError;
