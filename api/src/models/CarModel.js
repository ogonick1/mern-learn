const { Schema, model } = require('mongoose');
const CarBrand = require('./CarBrand');
const ExtraFeature = require('./ExtraFeature');
const FuelType = require('../enums/FuelType.enum');
const GearBox = require('../enums/GearBox.enum');
const DriveType = require('../enums/DriveType.enum');
const BodyType = require('../enums/BodyType.enum');

const schema = new Schema({
  id: String,
  name: String,
  brand: { CarBrand },
  yearStart: Number,
  yearEnd: { type: Number, default: 'null' },
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
      yupe: String,
      enum: DriveType,
    },
  }],
  extraFeatures: [
    {
      ExtraFeature,
    },
  ],
  bodyTypes: [{
    type: String,
    enum: BodyType,
  }],

});

module.exports = model('CarModel', schema);
