import BookController from './book.controller.js';
import BookService from './book.service.js';
import BookRouter from './book.router.js';

const bookService = new BookService();
const bookController = new BookController(bookService);
const bookRouter = new BookRouter(bookController);

export default {
  service: bookService,
  controller: bookController,
  router: bookRouter.getRouter(),
};