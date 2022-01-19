import { Router,Request,Response,NextFunction } from 'express';
import {validationResult} from 'express-validator'
import * as productsController from '../../controllers/v1/products-controller';
import { checkAuth } from '../../middlewares/auth-middleware';
import { validateNewProductBody } from '../../validators/v1/products-validator';

const router = Router();

router.get('',checkAuth, productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.post('',checkAuth,validateNewProductBody,
(req:Request,res:Response,next:NextFunction)=>{
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        next();        
    }else{
        res.status(400).send(errors.array())
    }
}, 
productsController.createProduct);
router.put('/:productId', productsController.updateProduct);
router.patch('/partial/:productId',productsController.partialUpdateProduct);
router.delete('/:productId', productsController.deleteProduct);

export default router;