import mongoose from 'mongoose';

  const HistorySchema = new mongoose.Schema({
    id: Number,
    description: String,
    year: {
      type: Number,
      min: [0, 'Incorrect year'],
      max: [9999, 'Incorrect year']
    }
  });

  HistorySchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const History = mongoose.model('History', HistorySchema);

  export default History;