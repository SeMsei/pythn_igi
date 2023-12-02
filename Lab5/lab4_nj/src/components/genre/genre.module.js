import GenreController from './genre.controller.js';
import GenreService from './genre.service.js';
import GenreRouter from './genre.router.js';

const genreService = new GenreService();
const genreController = new GenreController(genreService);
const genreRouter = new GenreRouter(genreController);

export default {
  service: genreService,
  controller: genreController,
  router: genreRouter.getRouter(),
};