import Response from '../../utils/response.js';
import genreModule from '../genre/genre.module.js';
import authorModule from '../author/author.module.js';
import Book from './book.entities.js';
import path from 'path'
import fs from 'fs'

class BookService {
    constructor() {
      this.books = [];
    }
  
    addBook = async (book) => {
        if (book.title == null || book.summary == null || book.ISBN == null ||
            book.author_id == null || book.genre_id == null || book.cost == null)
            return new Response(null, 400, "Book fields cannot be null");

        const author_ret = await authorModule.service.getAuthor(book.author_id);
        const author = author_ret.data;

        const genre_ret = await genreModule.service.getGenre(book.genre_id);
        const genre = genre_ret.data;

        console.log(author, genre);

        if (genre == null)
            return new Response(null, 400, "No such genre");
        if (author == null)
            return new Response(null, 400, "No such author");

        const books = await Book.find({});

        if (books.length == 0)
            book.id = 0;
        else
            book.id = books[books.length - 1].id + 1;

        console.log(book.imgUrl);

        await book.save();
        return new Response(book, 201, "Create Successfull");
    };
  
    getBooks = async (filterGenre, sort, find) => {
      var books = await Book.find({});

      if (filterGenre != null) {
        var _genres = await genreModule.service.getGenres();
        var genres = JSON.parse(JSON.stringify(_genres.data));
        var genre = genres.find((genre) => genre.name == filterGenre);
        if (genre != null) 
          books = books.filter((book) => book.genre_id == genre.id);
        else
          books =books.filter((book) => book.genre_id == -1);
      }

      if (sort != null) {
        if (sort == 'asc') {
          books.sort((a,b) => {
            if ( a.cost > b.cost ){
              return 1;
            }
            if ( a.cost < b.cost ){
              return -1;
            }
            return 0;
          });
        } else if (sort == 'desc') {
          books.sort((a,b) => {
            if ( a.cost > b.cost ){
              return -1;
            }
            if ( a.cost < b.cost ){
              return 1;
            }
            return 0;
          });
        }
      }

      if (find != null) {
        books = books.filter((book) => book.title.startsWith(find));
      }

      return new Response(books, 200, "Get Successfull");
    }
  
    getBook = async (id) => {
      //const book = this.books.find((u) => u.id == id);
      const book = await Book.findOne({id: id}, 'id title cost summary ISBN author_id genre_id imgUrl');

      if (book == null) {
        return new Response(null, 400, "No such book");
      }

      return new Response(book, 200, "Get successfull");
    };

    putBook = async (id, book) => {
      console.log(book);
      const _book = await Book.findOne({id: id}, 'id title cost summary ISBN author_id genre_id imgUrl');

      if (_book == null) {
        return new Response(null, 400, "No such book");
      }

      console.log(book);

      if (book.title == null || book.title == '' || book.summary == null || book.summary == '' || book.ISBN == null || book.ISBN == '' ||
        book.author_id == null || book.genre_id == null || book.cost == null || book.cost == '')
        return new Response(null, 400, "Book fields cannot be null");

        const author_ret = await authorModule.service.getAuthor(book.author_id);
        const author = author_ret.data;

        const genre_ret = await genreModule.service.getGenre(book.genre_id);
        const genre = genre_ret.data;

        console.log(author, genre);

        if (genre == null)
            return new Response(null, 400, "No such genre");
        if (author == null)
            return new Response(null, 400, "No such author");

      const ret = await Book.findOneAndUpdate({id: id}, {title: book.title, summary: book.summary, ISBN: book.ISBN, cost: book.cost, author_id: book.author_id, genre_id: book.genre_id, imgUrl: book.imgUrl}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteBook = async (id) => {
      const _book = await Book.findOne({id: id});

      if (_book == null)
        return new Response(null, 400, "No such book");

      await Book.findOneAndDelete({id: id});

      return new Response(_book, 200, "Delete successfull");
    }
  }
  
  export default BookService;