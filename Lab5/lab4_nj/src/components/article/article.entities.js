import mongoose from 'mongoose';

  const ArticleSchema = new mongoose.Schema({
    id: Number,
    date: Date,
    title: String,
    text: String,
    img: {type: Buffer}
  });

  ArticleSchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const Article = mongoose.model('Article', ArticleSchema);

  export default Article;