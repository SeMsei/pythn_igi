
import express from 'express';

class AuthRouter {
  constructor(authController) {
    this.authController = authController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/login').post(this.authController.login);
    router.route('/register').post(this.authController.register);
    router.route('/auth').post(this.authController.auth);
    return router;
  }
}

export default AuthRouter;