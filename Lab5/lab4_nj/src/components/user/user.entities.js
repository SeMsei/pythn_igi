import mongoose from 'mongoose';

  const UserSchema = new mongoose.Schema({
    id: Number,
    email: String,
    phone: String,
    role: {
      type: String,
      enum: {
        values: ['User', 'Staff', 'Admin'],
        message: 'Incorrect role' 
      }
    },
    password: String,
    name: String
  });

  UserSchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const User = mongoose.model('User', UserSchema);

  export default User;