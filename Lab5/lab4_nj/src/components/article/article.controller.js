import Article from './article.entities.js';

class ArticleController {
  constructor(articleService) {
    this.articleService = articleService;
  }

  createArticle= async (req, res) => {
    const article = new Article({title: req.body.title, text: req.body.text, date: req.body.date});
    
    const ret = await this.articleService.addArticle(article);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  getArticles = async (req, res) => {
    const sort = req.query.sort;
    const find = req.query.find;

    const ret = await this.articleService.getArticles(sort, find);
    return res.status(ret.status_code).send(ret.data);
  }

  getArticle = async (req, res) => {
    const { id } = req.params;

    const ret = await this.articleService.getArticle(id);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  putArticle = async (req, res) => {
    const { id } = req.params;

    

    const article = new Article({title: req.body.title, text: req.body.text, date: req.body.date});
    const ret = await this.articleService.putArticle(id, article);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteArticle = async (req, res) => {
    const { id } = req.params;
    const ret = await this.articleService.deleteArticle(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default ArticleController;