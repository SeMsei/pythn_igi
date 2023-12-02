import ArticleController from './article.controller.js';
import ArticleService from './article.service.js';
import ArticleRouter from './article.router.js';

const articleService = new ArticleService();
const articleController = new ArticleController(articleService);
const articleRouter = new ArticleRouter(articleController);

export default {
  service: articleService,
  controller: articleController,
  router: articleRouter.getRouter(),
};