const { Schema, model } = require('mongoose');
const { carBrandSchemaName } = require('./CarBrand');
const { extraFeatureSchemaName } = require('./ExtraFeature');
const FuelType = require('../enums/FuelType.enum');
const GearBox = require('../enums/GearBox.enum');
const DriveType = require('../enums/DriveType.enum');
const BodyType = require('../enums/BodyType.enum');

const schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: carBrandSchemaName,
  },
  yearStart: Number,
  yearEnd: { type: Number, default: null },
  powerUnits: [{
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
  }],
  extraFeatures: [
    {
      type: Schema.Types.ObjectId,
      ref: extraFeatureSchemaName,
    },
  ],
  bodyTypes: [{
    type: String,
    enum: BodyType,
  }],
});

const schemaName = 'CarModel';

module.exports = {
  carModelSchemaName: schemaName,
  CarModelModel: model(schemaName, schema),
};
