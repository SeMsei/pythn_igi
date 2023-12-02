import Author from './author.entities.js';
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

class AuthorController {
  constructor(authorService) {
    this.authorService = authorService;
  }

  createAuthor = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const author = new Author({name: req.body.name});
    const ret = await this.authorService.addAuthor(author);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  getAuthors = async (_, res) => {
    const ret = await this.authorService.getAuthors();
    res.status(200).send(ret.data);
  }

  getAuthor = async (req, res) => {
    const { id } = req.params;
    const ret = await this.authorService.getAuthor(id);

    if (ret.data == null)
      return res.status(200).send(ret.msg);
    
    return res.status(200).send(ret.data);
  };

  putAuthor = async (req, res) => {
    const { id } = req.params;

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const author = new Author({name: req.body.name});
    const ret = await this.authorService.putAuthor(id, author);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteAuthor = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.authorService.deleteAuthor(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default AuthorController;