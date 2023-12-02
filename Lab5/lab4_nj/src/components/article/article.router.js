
import express from 'express';

class ArticleRouter {
  constructor(articleController) {
    this.articleController = articleController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.articleController.getArticle);
    router.route('/:id').put(this.articleController.putArticle);
    router.route('/:id').delete(this.articleController.deleteArticle);
    router.route('/').get(this.articleController.getArticles);
    router.route('/').post(this.articleController.createArticle);
    return router;
  }
}

export default ArticleRouter;