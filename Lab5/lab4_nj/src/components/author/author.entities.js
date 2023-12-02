import mongoose from 'mongoose';

const AuthorSchema = new mongoose.Schema({
  id: Number,
  name: String
});

AuthorSchema.options.toJSON = {
  transform: function(doc, ret, options) {
    delete ret._id;
    delete ret.__v;
    return ret;
}
};

const Author = mongoose.model('Author', AuthorSchema);

export default Author;