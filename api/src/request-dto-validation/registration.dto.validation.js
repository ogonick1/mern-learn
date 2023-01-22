const { check } = require('express-validator');
const { getStringLengthValidationMessage } = require('./getSrtingLengthValidationMessage');

const registrationDtoValidation = [
  check('email', 'incorrect email address').isEmail(),
  check('password', getStringLengthValidationMessage({
    minLength: 5,
    maxLength: 255,
    fieldName: 'password',
  })).isLength({ min: 5, max: 255 }),
  check('userName', getStringLengthValidationMessage({
    minLength: 2,
    maxLength: 225,
    fieldName: 'userName',
  })).isLength({ min: 2 }),
  check('firstName', getStringLengthValidationMessage({
    minLength: 2,
    maxLength: 255,
    fieldName: 'firstName',
  })).isLength({ min: 2, max: 255 }),
  check('lastName', getStringLengthValidationMessage({
    minLength: 3,
    maxLength: 255,
    fieldName: 'lastName',
  })).isLength({ min: 3, max: 255 }),
];

module.exports = {
  registrationDtoValidation,
};
