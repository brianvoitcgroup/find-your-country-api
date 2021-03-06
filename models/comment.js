const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const commentSchema = new mongoose.Schema({
  content: String,
  countryId: String,
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

commentSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Comment', commentSchema);
