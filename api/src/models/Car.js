const { Schema, model } = require('mongoose');
const { carModelSchemaName } = require('./CarModel');
const { extraFeatureSchemaName } = require('./ExtraFeature');
const FuelType = require('../enums/FuelType.enum');
const GearBox = require('../enums/GearBox.enum');
const DriveType = require('../enums/DriveType.enum');
const BodyType = require('../enums/BodyType.enum');

const schema = new Schema({
  modelId: {
    type: Schema.Types.ObjectId,
    ref: carModelSchemaName,
  },
  powerUnit: {
    engineVolume: Number,
    fuelType: {
      type: String,
      enum: FuelType,
    },
    gearBox: {
      type: String,
      enum: GearBox,
    },
    driveType: {
      type: String,
      enum: DriveType,
    },
  },
  year: Number,
  bodyTypes: {
    type: String,
    enum: BodyType,
  },
  extraFeaturesIds: [
    {
      type: Schema.Types.ObjectId,
      ref: extraFeatureSchemaName,
    },
  ],
  color: String,
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
});

const schemaName = 'Car';

module.exports = {
  carSchemaName: schemaName,
  CarModel: model(schemaName, schema),
};
