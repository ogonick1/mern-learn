const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: String,
  name: String,
  country: String,
});

module.exports = model('CarBrand', schema);
