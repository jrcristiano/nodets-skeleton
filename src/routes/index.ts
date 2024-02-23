import { Router } from 'express';
import AuthController from './../controllers/AuthController';
import UserController from './../controllers/UserController';
import UserValidation from './../validations/UserValidation';

const router = Router();

router.post('/login', UserValidation.login, AuthController.login);

router.get('/users', UserController.index);
router.post('/users', UserValidation.handle, UserController.store);
router.get('/users/:id', UserController.show);
router.put('/users/:id', UserValidation.handle, UserController.update);
router.delete('/users/:id', UserController.destroy);

export default router;