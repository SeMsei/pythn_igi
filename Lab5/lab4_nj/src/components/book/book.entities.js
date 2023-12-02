import mongoose from 'mongoose';

/*class Book {
    constructor(title, summary, ISBN, author_id, genre_id) {
      //this.id = crypto.randomUUID();
      this.title = title;
      this.summary = summary;
      this.ISBN = ISBN;
      this.author_id = author_id;
      this.genre_id = genre_id;
    }
  
    toJSON() {
      return {
        id: this.id,
        title: this.title,
        ISBN: this.ISBN,
        author_id: this.author_id,
        genre_id: this.genre_id
      };
    }
  }*/

  const BookSchema = new mongoose.Schema({
    id: Number,
    title: String,
    summary: String,
    ISBN: {
      type: Number,
      min: 0
    },
    cost: {
      type: Number,
      min: [0, 'Price cannot be negative']
    },
    author_id: Number,
    genre_id: Number,
    imgUrl: String
  });

  BookSchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const Book = mongoose.model('Book', BookSchema);

  export default Book;