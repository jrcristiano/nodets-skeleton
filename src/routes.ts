import { Router } from 'express';
import AuthController from './controllers/AuthController';
import UserController from './controllers/UserController';
import CheckJwtMiddleware from './middlewares/checkJwtMiddleware';
import UserValidation from './validations/UserValidation';

const router = Router();

router.post('/login', UserValidation.login, AuthController.login);

router.get('/users', CheckJwtMiddleware, UserController.index);
router.post('/users', CheckJwtMiddleware, UserValidation.store, UserController.store);
router.get('/users/:id', CheckJwtMiddleware, UserController.show);
router.put('/users/:id', CheckJwtMiddleware, UserValidation.update, UserController.update);
router.delete('/users/:id', CheckJwtMiddleware, UserController.destroy);

export default router;