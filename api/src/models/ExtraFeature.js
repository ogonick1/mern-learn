const { Schema, model } = require('mongoose');

const schema = new Schema({
  id: String,
  title: String,
  description: String,
});

const schemaName = 'ExtraFeature';

module.exports = {
  extraFeatureSchemaName: schemaName,
  ExtraFeatureModel: model(schemaName, schema),
};
