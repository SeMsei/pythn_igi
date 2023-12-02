
import express from 'express';

class AuthorRouter {
  constructor(authorController) {
    this.authorController = authorController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.authorController.getAuthor);
    router.route('/:id').put(this.authorController.putAuthor);
    router.route('/:id').delete(this.authorController.deleteAuthor);
    router.route('/').get(this.authorController.getAuthors);
    router.route('/').post(this.authorController.createAuthor);
    return router;
  }
}

export default AuthorRouter;