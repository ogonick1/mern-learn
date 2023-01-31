const { check } = require('express-validator');
const { getStringLengthValidationMessage } = require('./getStringLengthValidationMessage');

const extraFeatureCreateUpdateDtoValidations = [
  check('title')
    .isLength({ min: 3, max: 20 })
    .withMessage(getStringLengthValidationMessage({
      minLength: 3,
      maxLength: 20,
      fieldName: 'title',
    })),
  check('description')
    .isLength({ min: 1, max: 255 })
    .withMessage(getStringLengthValidationMessage({
      minLength: 1,
      maxLength: 255,
      fieldName: 'description',
    })),
];

module.exports = {
  extraFeatureCreateUpdateDtoValidations,
};
