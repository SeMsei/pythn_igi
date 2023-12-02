import Response from '../../utils/response.js';
import Article from './article.entities.js';

class ArticleService {
    constructor() {
      this.books = [];
    }
  
    addArticle = async (article) => {
        if (article.title == null || article.date == null || article.text == null)
            return new Response(null, 400, "Book fields cannot be null");

        const articles = await Article.find({});

        if (articles.length == 0)
            article.id = 0;
        else
            article.id = articles[articles.length - 1].id + 1;
        await article.save();
        return new Response(article, 201, "Create Successfull");
    };
  
    getArticles = async (sort, find) => {
      var articles = await Article.find({}, 'id title text date');
      console.log(articles);

      if (sort != null) {
        if (sort == 'asc') {
            articles.sort((a,b) => {
            if ( a.date > b.date ){
              return 1;
            }
            if ( a.date < b.date ){
              return -1;
            }
            return 0;
          });
        } else if (sort == 'desc') {
            articles.sort((a,b) => {
            if ( a.date > b.date ){
              return -1;
            }
            if ( a.date < b.date ){
              return 1;
            }
            return 0;
          });
        }
      }

      if (find != null) {
        articles = articles.filter((article) => article.title.startsWith(find));
      }

      return new Response(articles, 200, "Get Successfull");
    }
  
    getArticle = async (id) => {
      //const book = this.books.find((u) => u.id == id);
      const article = await Article.findOne({id: id}, 'id title text date');

      if (article == null) {
        return new Response(null, 400, "No such article");
      }

      return new Response(article, 200, "Get successfull");
    };

    putArticle = async (id, article) => {
      const _article = await Article.findOne({id: id}, 'id title text date');

      if (_article == null) {
        return new Response(null, 400, "No such article");
      }

      if (article.title == null || article.text == null || article.date == null)
        return new Response(null, 400, "Article fields cannot be null");

      const ret = await Article.findOneAndUpdate({id: id}, {title: article.title, text: article.text, date: article.date}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteArticle = async (id) => {
      const _article = await Article.findOne({id: id});

      if (_article == null)
        return new Response(null, 400, "No such article");

      await Article.findOneAndDelete({id: id});

      return new Response(_article, 200, "Delete successfull");
    }
  }
  
  export default ArticleService;