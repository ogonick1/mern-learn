const { Schema, model } = require('mongoose');
const { carModelSchemaName } = require('./CarModel');
const { extraFeatureSchemaName } = require('./ExtraFeature');
const FuelType = require('../enums/FuelType.enum');
const GearBox = require('../enums/GearBox.enum');
const DriveType = require('../enums/DriveType.enum');
const BodyType = require('../enums/BodyType.enum');

const schema = new Schema({
  carModelId: {
    type: Schema.Types.ObjectId,
    ref: carModelSchemaName,
  },
  powerUnit: {
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
  year: Number,
  bodyTypes: {
    type: String,
    required: true,
    enum: Object.values(BodyType),
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
  plateNumberRegistrationDate: {
    type: Date,
    required: true,
  },
});

const schemaName = 'Car';

module.exports = {
  carSchemaName: schemaName,
  CarModel: model(schemaName, schema),
};
