import { Router } from 'express';
import * as productsController from '../../controllers/v1/products-controller';
import { checkAuth } from '../../middlewares/auth-middleware';

const router = Router();

router.get('',checkAuth, productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.post('',checkAuth, productsController.createProduct);
router.put('/:productId', productsController.updateProduct);
router.patch('/partial/:productId',productsController.partialUpdateProduct);
router.delete('/:productId', productsController.deleteProduct);

export default router;