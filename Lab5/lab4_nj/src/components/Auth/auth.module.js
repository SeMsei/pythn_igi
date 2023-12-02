import AuthController from './auth.controller.js';
import AuthRouter from './auth.router.js';

const authController = new AuthController();
const authRouter = new AuthRouter(authController);

export default {
  controller: authController,
  router: authRouter.getRouter(),
};