const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const countrySchema = new mongoose.Schema({
  otherId: { type: String, unique: true, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

countrySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

countrySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Country', countrySchema);
