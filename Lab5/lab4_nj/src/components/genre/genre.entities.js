import crypto from 'crypto';
import mongoose from 'mongoose';

/*class Genre {
  constructor(name) {
    this.name = name;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}*/

const GenreSchema = new mongoose.Schema({
  id: Number,
  name: String
});

GenreSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
}
};

const Genre = mongoose.model('Genre', GenreSchema);


export default Genre;