import { Router } from 'express';
import authValidator from '../../middleware/validators/auth/index.js';
import authController from '../../controllers/auth/index.js';
const authRouter = Router();

// register
authRouter.post(
  '/register',
  authValidator.registerValidator,
  authController.register
);

// login
authRouter.post('/login', authValidator.loginValidator, authController.login);

// logout
authRouter.get('/logout', authController.logout);

export default authRouter;
