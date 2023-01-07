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
  },
  brandId: {
    type: Schema.Types.ObjectId,
    ref: carBrandSchemaName,
  },
  yearStart: Number,
  yearEnd: { type: Number, default: null },
  powerUnits: {
    _id: false,
    type: [
      {
        engineVolume: {
          type: Number,
          required: true,
        },
        fuelType: {
          type: String,
          required: true,
          enum: Object.values(FuelType),
        },
        gearBox: {
          type: String,
          required: true,
          enum: Object.values(GearBox),
        },
        driveType: {
          type: String,
          required: true,
          enum: Object.values(DriveType),
        },
      },
    ],
  },
  extraFeaturesIds: [
    {
      type: Schema.Types.ObjectId,
      ref: extraFeatureSchemaName,
    },
  ],
  bodyTypes: [{
    type: String,
    enum: Object.values(BodyType),
  }],
});

const schemaName = 'CarModel';

module.exports = {
  carModelSchemaName: schemaName,
  CarModelModel: model(schemaName, schema),
};
