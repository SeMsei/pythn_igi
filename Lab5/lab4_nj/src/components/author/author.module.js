import AuthorController from './author.controller.js';
import AuthorService from './author.service.js';
import AuthorRouter from './author.router.js';

const authorService = new AuthorService();
const authorController = new AuthorController(authorService);
const authorRouter = new AuthorRouter(authorController);

export default {
  service: authorService,
  controller: authorController,
  router: authorRouter.getRouter(),
};