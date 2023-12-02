
import express from 'express';

class BookRouter {
  constructor(bookController) {
    this.bookController = bookController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.bookController.getBook);
    router.route('/:id').put(this.bookController.putBook);
    router.route('/:id').delete(this.bookController.deleteBook);
    router.route('/').get(this.bookController.getBooks);
    router.route('/').post(this.bookController.createBook);
    return router;
  }
}

export default BookRouter;