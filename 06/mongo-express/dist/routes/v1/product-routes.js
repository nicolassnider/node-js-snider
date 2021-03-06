"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productsController = __importStar(require("../../controllers/v1/products-controller"));
const auth_middleware_1 = require("../../middlewares/auth-middleware");
const products_validator_1 = require("../../validators/v1/products-validator");
const router = (0, express_1.Router)();
router.get('', auth_middleware_1.checkAuth, productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.post('', auth_middleware_1.checkAuth, products_validator_1.validateNewProductBody, (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        next();
    }
    else {
        res.status(400).send(errors.array());
    }
}, productsController.createProduct);
router.put('/:productId', productsController.updateProduct);
router.patch('/partial/:productId', productsController.partialUpdateProduct);
router.delete('/:productId', productsController.deleteProduct);
exports.default = router;
