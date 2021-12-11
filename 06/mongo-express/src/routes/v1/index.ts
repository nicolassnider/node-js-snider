import { Application } from 'express';
import * as productsController from '../../controllers/v1/products-controller';
import * as usersController from '../../controllers/v1/users-controller';

const createRoutesV1 = (app: Application):void => {
  app.post('/api/vi/users',usersController.createUser);
  app.get('/api/v1/users', usersController.getUsers);
  app.get('/api/v1/users/:userId', usersController.getUserById);

  app.get('/api/v1/products', productsController.getProducts);
  app.get('/api/v1/products/:productId', productsController.getProductById);
  app.post('/api/v1/products', productsController.createProduct);
  //app.put('/api/v1/products/:productId', productsController.updateProduct);
  /* app.patch(
    '/api/v1/products/partial/:productId',
    productsController.partialUpdateProduct
  ); */
  //app.delete('/api/v1/products/:productId', productsController.deleteProduct);
};

export default createRoutesV1;
