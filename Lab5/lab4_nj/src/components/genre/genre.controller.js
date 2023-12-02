import Genre from './genre.entities.js';
import GenreService from './genre.service.js';
import jwt from 'jsonwebtoken'

function check_jwt(token) {

  const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
    if (err) {
    } else {
      return decoded;
    }
  });

  if (decoded == undefined) {
    return false;
  }

  const role = decoded.user.role;

  if (role != "Staff" && role != 'Admin') {
    return false;
  }

  return true;
}

class GenreController {
  constructor(genreService) {
    this.genreService = genreService;
  }

  createGenre = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const genre = new Genre({name: req.body.name});
    console.log(genre);
    const ret = await this.genreService.addGenre(genre);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);
    
    return res.status(ret.status_code).send(ret.data);
  };

  getGenres = async (_, res) => {
    const ret = await this.genreService.getGenres();
      res.status(200).send(ret.data);
      
    //;
  }

  getGenre = async (req, res) => {
    const { id } = req.params;
    const ret = await this.genreService.getGenre(id);
    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

      

    return res.status(ret.status_code).send(ret.data);
  };

  putGenre = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const genre = new Genre({name: req.body.name});
    const ret = await this.genreService.putGenre(id, genre);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteGenre = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.genreService.deleteGenre(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default GenreController;