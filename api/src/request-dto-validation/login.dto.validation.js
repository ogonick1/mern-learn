const { check } = require('express-validator');
const { getStringLengthValidationMessage } = require('./getSrtingLengthValidationMessage');

const loginDtoValidation = [
  check('email', 'incorrect email address').isEmail(),
  check('password', getStringLengthValidationMessage({
    minLength: 3,
    maxLength: 255,
    fieldName: 'password',
  })).isLength({ min: 5, max: 255 }),
];

module.exports = {
  loginDtoValidation,
};
