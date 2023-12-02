import mongoose from 'mongoose';

  const VacancySchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    salary: Number
  });

  VacancySchema.options.toJSON = {
    transform: function(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
      return ret;
  }
  };
  
  const Vacancy = mongoose.model('Vacancy', VacancySchema);

  export default Vacancy;