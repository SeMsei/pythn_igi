import Response from '../../utils/response.js';
import Author from './author.entities.js';

class AuthorService {
    constructor() {
      this.authors = [];
    }
  
    addAuthor = async (author) => {
      if (author.name == undefined)
        return new Response(null, 400, "Name cannot be null");

      const authors = await Author.find({});

      if (authors.length == 0)
          author.id = 0;
      else
          author.id = authors[authors.length - 1].id + 1;

      await author.save();
      return new Response(author, 201, "Create successfull");
    };
  
    getAuthors = async () => {
      return new Response(await Author.find({}, 'id name'), 200, "Get successfull");
    }
  
    getAuthor = async (id) => {
      const author = await Author.findOne({id: id}, 'id name');

      if (author == null)
        return new Response(null, 400, "No such author");

      return new Response(author, 200, "Get successfull");
    };

    putAuthor = async (id, author) => {
      const _author = await Author.findOne({id: id}, 'id name');

      if (_author == null)
        return new Response(null, 400, "No such author");

      if (author.name == null)
        return new Response(null, 400, "Name cannot be null");

      const ret = await Author.findOneAndUpdate({id: id}, {name: author.name}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteAuthor = async (id) => {
      const _author = await Author.findOne({id: id}, 'id name');

      if (_author == null)
        return new Response(null, 400, "No such author");

      await Author.findOneAndDelete({id: id});

      return new Response(_author, 200, "Delete successfull");
    };
  }
  
  export default AuthorService;