const { check } = require('express-validator');
const { arrayUnique } = require('../validation/array-unique.validations');
const { FuelType } = require('../enums/FuelType.enum');
const { GearBox } = require('../enums/GearBox.enum');
const { DriveType } = require('../enums/DriveType.enum');
const { BodyType } = require('../enums/BodyType.enum');
const { getStringLengthValidationMessage } = require('./getStringLengthValidationMessage');
const {
  getMongoIdInvalidFieldMessage,
  getIntInvalidFieldMessage,
  getEnumInvalidFieldMessage,
} = require('../utils/validation-error-builders.utils');

const carCreateUpdateDtoValidation = [
  check('carModelId')
    .isMongoId()
    .withMessage(getMongoIdInvalidFieldMessage('carModelId')),
  check('powerUnit')
    .isObject()
    // TODO getStringLengthValidationMessage for isObject ???
    .withMessage(getStringLengthValidationMessage({
      fieldName: 'powerUnit',
    })),

  // TODO - mistake powerUnits.*.engineVolume -> powerUnit.engineVolume
  // ALL FORM THIS LINE
  check('powerUnits.*.engineVolume')
    .isInt()
    .withMessage(getIntInvalidFieldMessage({
      fieldName: 'engineVolume',
    })),
  check('powerUnits.*.fuelType')
    .isIn(Object.values(FuelType))
    .withMessage(getEnumInvalidFieldMessage({
      fieldName: 'powerUnits.*.fuelType',
      validValues: Object.values(FuelType),
    })),
  check('powerUnits.*.gearBox')
    .isIn(Object.values(GearBox))
    .withMessage(getEnumInvalidFieldMessage({
      fieldName: 'powerUnits.*.gearBox',
      validValues: Object.values(GearBox),
    })),
  check('powerUnits.*.driveType')
    .isIn(Object.values(DriveType))
    .withMessage(getEnumInvalidFieldMessage({
      fieldName: 'powerUnits.*.driveType',
      validValues: Object.values(DriveType),
    })),
  // TO THIS LINE

  check('year')
    .isInt({ min: 1950 })
    .withMessage(getIntInvalidFieldMessage({
      fieldName: 'year',
      min: 1950,
    })),
  // TODO rename bodyTypes -> bodyType (in model too)
  check('bodyTypes')
    .isIn(Object.values(BodyType))
    .withMessage(getEnumInvalidFieldMessage({
      fieldName: 'bodyTypes',
      validValues: Object.values(BodyType),
    })),

  check('extraFeaturesIds')
    .optional()
    .isArray()
    .custom((value) => arrayUnique(value))
    .withMessage('extraFeaturesIds values must be unique'),
  check('extraFeaturesIds.*')
    .isMongoId()
    .withMessage(getMongoIdInvalidFieldMessage('extraFeaturesIds')),
  check('color')
    .isLength({ min: 1, max: 255 })
    .withMessage(getStringLengthValidationMessage({
      minLength: 1,
      maxLength: 255,
      fieldName: 'color',
    })),
  check('plateNumber')
    .isString()
    .isLength({ min: 1, max: 10 })
    .withMessage(getStringLengthValidationMessage({
      minLength: 1,
      maxLength: 10,
      fieldName: 'plateNumber',
    })),
  check('plateNumberRegistrationDate')
    .isISO8601()
    .toDate()
    // TODO the same getStringLengthValidationMessage for toDate ???
    .withMessage(getStringLengthValidationMessage({
      fieldName: 'plateNumberRegistrationDate',
    })),

];

module.exports = {
  carCreateUpdateDtoValidation,
};
