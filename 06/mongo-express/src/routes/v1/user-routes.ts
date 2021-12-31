import { Router } from 'express';
import * as usersController from '../../controllers/v1/users-controller';

const router = Router();

router.post('', usersController.createUser);
router.get('', usersController.getUsers);
router.get('/:userId', usersController.getUserById);
router.delete('/:userId', usersController.deleteUser);

export default router;