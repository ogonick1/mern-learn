const { check } = require('express-validator');
const { arrayUnique } = require('../validation/array-unique.validations');
const { FuelType } = require('../enums/FuelType.enum');
const { GearBox } = require('../enums/GearBox.enum');
const { DriveType } = require('../enums/DriveType.enum');
const { getStringLengthValidationMessage } = require('./getStringLengthValidationMessage');
const {
  getMongoIdInvalidFieldMessage,
  getIntInvalidFieldMessage,
  getEnumInvalidFieldMessage,
} = require('../utils/validation-error-builders.utils');

const carModelCreateUpdateDtoValidation = [
  check('name', getStringLengthValidationMessage({
    minLength: 3,
    maxLength: 20,
    fieldName: 'name',
  })).isLength({ min: 3, max: 20 }),
  check('brandId')
    .isMongoId()
    .withMessage(getMongoIdInvalidFieldMessage('brandId')),
  check('yearStart')
    .isInt({ min: 1950 })
    .withMessage(getIntInvalidFieldMessage({
      fieldName: 'yearStart',
      min: 1950,
    })),
  check('yearEnd', 'incorrect yearEnd').optional().custom((value, { req }) => (value > req.body.yearStart)),

  check('powerUnits', 'invalid powerUnits')
    .isArray({ min: 1 })
    .custom((value) => arrayUnique(
      value,
      (powerUnit) => `${powerUnit.driveType}-${powerUnit.gearBox}-${powerUnit.fuelType}-${powerUnit.engineVolume}`,
    ))
    .withMessage('powerUnits values must be unique'),
  check('powerUnits.*.engineVolume', 'invalid engineVolume').isInt(),
  check('powerUnits.*.fuelType')
    .isIn(Object.values(FuelType))
    .withMessage(getEnumInvalidFieldMessage({
      fieldName: 'powerUnits.*.fuelType',
      validValues: Object.values(GearBox),
    })),
  check('powerUnits.*.gearBox', 'invalid gearBox').isIn(Object.values(GearBox)),
  check('powerUnits.*.driveType', 'invalid driverType').isIn(Object.values(DriveType)),
  check(
    'extraFeaturesIds',
    'incorrect extraFeaturesIds',
  )
    .optional()
    .isArray()
    .custom((value) => arrayUnique(value))
    .withMessage('extraFeaturesIds values must be unique'),
  check('extraFeaturesIds.*')
    .isMongoId()
    .withMessage('Must be valid mongo id'),
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
