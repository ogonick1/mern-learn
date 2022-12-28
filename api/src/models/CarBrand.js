const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  country: {
    type: String,
  },
});

const schemaName = 'CarBrand';

module.exports = {
  carBrandSchemaName: schemaName,
  CarBrandModel: model(schemaName, schema),
};
