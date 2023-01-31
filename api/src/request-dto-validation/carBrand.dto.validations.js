const { check } = require('express-validator');
const { getStringLengthValidationMessage } = require('./getStringLengthValidationMessage');

const carBrandDtoValidations = [
  check('name', getStringLengthValidationMessage({
    minLength: 3,
    maxLength: 255,
    fieldName: 'name',
  })).isLength({ min: 3, max: 255 }),
  check('country', getStringLengthValidationMessage({
    minLength: 3,
    maxLength: 255,
    fieldName: 'name',
  })).isLength({ min: 3, max: 255 }),
];
module.exports = {
  carBrandDtoValidations,
};
