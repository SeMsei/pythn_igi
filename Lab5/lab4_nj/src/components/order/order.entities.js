import mongoose from 'mongoose';

  const OrderSchema = new mongoose.Schema({
    id: Number,
    book_name: String,
    user_id: Number
  });

  OrderSchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const Order = mongoose.model('Order', OrderSchema);

  export default Order;