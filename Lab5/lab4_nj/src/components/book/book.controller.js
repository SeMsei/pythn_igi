import Book from './book.entities.js';
import jwt, { decode } from 'jsonwebtoken';

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

  return true;
}

class BookController {
  constructor(bookService) {
    this.bookService = bookService;
  }

  createBook = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');
    console.log(req.body.image);
    const book = new Book({title: req.body.title, summary: req.body.summary, ISBN: req.body.ISBN, cost: req.body.cost, author_id: req.body.author_id, genre_id: req.body.genre_id, imgUrl: req.body.imgUrl});
    
    if (req.body.cost < 0) {
      return res.status(404).send('Price cannot be negative');
    }

    if (req.body.ISBN < 0) {
      return res.status(404).send('ISBN cannot be negative');
    }

    const ret = await this.bookService.addBook(book);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  getBooks = async (req, res) => {
    const filterGenre =  req.query.filterGenre;
    const sort = req.query.sort;
    const find = req.query.find;

    const ret = await this.bookService.getBooks(filterGenre, sort, find);
    return res.status(ret.status_code).send(ret.data);
  }

  getBook = async (req, res) => {
    const { id } = req.params;

    const ret = await this.bookService.getBook(id);

    if (ret.data == null)
        return res.status(ret.status_code).send(ret.msg);
   
    return res.status(ret.status_code).send(ret.data);
  };

  putBook = async (req, res) => {
    const { id } = req.params;

    if (req.body.cost < 0) {
      return res.status(404).send('Price cannot be negative');
    }

    if (req.body.ISBN < 0) {
      return res.status(404).send('ISBN cannot be negative');
    }

    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const book = new Book({title: req.body.title, summary: req.body.summary, ISBN: req.body.ISBN, cost: req.body.cost, author_id: req.body.author_id, genre_id: req.body.genre_id, imgUrl: req.body.imgUrl});
    const ret = await this.bookService.putBook(id, book);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };

  deleteBook = async (req, res) => {
    const token = req.get('Authorization');

    if (!check_jwt(token))
      return res.status(403).send('Forbidden');

    const { id } = req.params;
    const ret = await this.bookService.deleteBook(id);

    if (ret.data == null)
      return res.status(ret.status_code).send(ret.msg);

    return res.status(ret.status_code).send(ret.data);
  };
}

export default BookController;