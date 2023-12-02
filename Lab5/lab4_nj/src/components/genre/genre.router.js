
import express from 'express';

class GenreRouter {
  constructor(genreController) {
    this.genreController = genreController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.genreController.getGenre);
    router.route('/:id').put(this.genreController.putGenre);
    router.route('/:id').delete(this.genreController.deleteGenre);
    router.route('/').get(this.genreController.getGenres);
    router.route('/').post(this.genreController.createGenre);
    return router;
  }
}

export default GenreRouter;