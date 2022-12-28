const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: String,
  title: String,
  description: String,
});

module.exports = model('ExtraFeature', schema);
