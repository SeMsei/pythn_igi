import Response from '../../utils/response.js';
import Genre from './genre.entities.js';

class GenreService {
    constructor() {
      this.genres = [];
    }
  
    addGenre = async (genre) => {
      console.log(genre);

      if (genre.name == null) {
        return new Response(null, 400, "Name cannot be null");
      }

      const genres = await Genre.find({});  

      if (genres.length == 0)
          genre.id = 0;
      else
          genre.id = genres[genres.length - 1].id + 1;

      this.genres.push(genre);

      await genre.save();

      return new Response(genre, 201, "Create successfull");
    };
  
    getGenres = async () => {
      var _genres = await Genre.find({}, 'id name');

      return new Response(_genres, 200, "Get successfull");
    }
  
    getGenre = async (id) => {

      console.log(id);
      //const genre = this.genres.find((u) => u.id == id);
      const genre = await Genre.findOne({id: id}, 'id name');
      console.log(genre);

      if (genre == null)
        return new Response(null, 400, "No such genre");

      return new Response(genre, 200, "Get successfull");
    };

    putGenre = async (id, genre) => {
      const _genre = await Genre.findOne({id: id}, 'id name');

      if (_genre == null)
        return new Response(null, 400, "No such genre");

      if (genre.name == null)
        return new Response(null, 400, "Name cannot be null");

      const ret = await Genre.findOneAndUpdate({id: id}, {name: genre.name}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteGenre = async (id) => {
      const _genre = await Genre.findOne({id: id}, 'id name');

      if (_genre == null)
        return new Response(null, 400, "No such genre");

      await Genre.findOneAndDelete({id: id});

      return new Response(_genre, 200, "Delete successfull");
    };
  }
  
  export default GenreService;