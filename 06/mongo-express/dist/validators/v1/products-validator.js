"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewProductBody = void 0;
const express_validator_1 = require("express-validator");
exports.validateNewProductBody = (0, express_validator_1.checkSchema)({
    year: {
        isInt: true,
        customSanitizer: {
            options: (value) => {
                return parseInt(value);
            },
        }
    }
});
