const { Schema, model } = require('mongoose');
const CarModel = require('./CarModel');
const ExtraFeature = require('./ExtraFeature');
const FuelType = require('../enums/FuelType.enum');
const GearBox = require('../enums/GearBox.enum');
const DriveType = require('../enums/DriveType.enum');
const BodyType = require('../enums/BodyType.enum');

const schema = new Schema({
  id: String,
  model: CarModel,
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
      yupe: String,
      enum: DriveType,
    },
  },
  year: Number,
  bodyTypes: {
    type: String,
    enum: BodyType,
  },
  extraFeatures: [
    ExtraFeature,
  ],
  color: String,
  plateNumber: String,
});

module.exports = model('Car', schema);
