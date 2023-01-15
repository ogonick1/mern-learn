const { check } = require('express-validator');
const { arrayUnique } = require('../validation/array-unique.validations');
const { FuelType } = require('../enums/FuelType.enum');
const { GearBox } = require('../enums/GearBox.enum');
const { DriveType } = require('../enums/DriveType.enum');

const carModelCreateUpdateDtoValidation = [
  check('name', 'incorrect title, min 3 symbols max 20').isLength({ min: 3, max: 20 }),
  check('brandId', 'incorrect brand id').isMongoId(),
  check('yearStart', 'incorrect yearStart').isInt({ min: 1950 }),
  check('yearEnd', 'incorrect yearEnd').optional().custom((value, { req }) => (value > req.body.yearStart)),

  check('powerUnits', 'invalid powerUnits')
    .isArray({ min: 1 })
    .custom((value) => arrayUnique(
      value,
      (powerUnit) => `${powerUnit.driveType}-${powerUnit.gearBox}-${powerUnit.fuelType}-${powerUnit.engineVolume}`,
    ))
    .withMessage('powerUnits values must be unique'),
  check('powerUnits.*.engineVolume', 'invalid engineVolume').isInt(),
  check('powerUnits.*.fuelType', 'invalid fuelType').isIn(Object.values(FuelType)),
  check('powerUnits.*.gearBox', 'invalid gearBox').isIn(Object.values(GearBox)),
  check('powerUnits.*.driveType', 'invalid driverType').isIn(Object.values(DriveType)),
  check(
    'extraFeaturesIds',
    'incorect extraFeaturesIds',
  )
    .optional()
    .isArray()
    .custom((value) => arrayUnique(value))
    .withMessage('extraFeaturesIds values must be unique')
    .isMongoId(),
  check(
    'bodyTypes.*',
    'incorrect bodyTypes',
  )
    .isIn([
      'SEDAN',
      'STATION_WAGON',
      'HATCHBACK',
      'COUPE',
    ]),
  check(
    'bodyTypes',
    'incorrect bodyTypes',
  )
    .isArray({ min: 1 })
    .custom((value) => arrayUnique(value))
    .withMessage('bodyTypes values must be unique'),
];

module.exports = {
  carModelCreateUpdateDtoValidation,
};
