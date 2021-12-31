import { Application } from 'express';
import * as productsController from '../../controllers/v1/products-controller';
import * as usersController from '../../controllers/v1/users-controller';
import userRouter from './user-routes';
import productRouter from './product-routes';

const createRoutesV1 = (app: Application):void => {

  app.use('/api/v1/users',userRouter)
  app.use('/api/v1/products', productRouter)  
};

export default createRoutesV1;
