import { Router } from 'express';
import * as productsController from '../../controllers/v1/products-controller';

const router = Router();

router.get('', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.post('', productsController.createProduct);
router.put('/:productId', productsController.updateProduct);
router.patch(
  '/partial/:productId',
  productsController.partialUpdateProduct
);
router.delete('/:productId', productsController.deleteProduct);

export default router;