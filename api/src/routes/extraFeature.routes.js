const { Router } = require('express');
const { check } = require('express-validator');
const {
  createExtraFeature,
  getExtraFeatureById,
  updateExtraFeature,
  removeExtraFeature,
  searchExtraFeature,
} = require('../controllers/extraFeature.controller');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validatorErrorHandler.middleware');
const { objectIdParamValidationMiddleware } = require('../middlewares/objectIdParamValidation.middleware');
const { searchRequestValidation } = require('../validation/search-request.validation');

const router = Router();

const getStringLengthValidationMessage = ({
  minLength,
  maxLength,
  fieldName,
}) => {
  const hasMinLength = typeof minLength === 'number';
  const hasMaxLength = typeof maxLength === 'number';
  if (hasMinLength && hasMaxLength) {
    return `Field length ${fieldName} must be between ${minLength} and ${maxLength}`;
  }
  if (hasMaxLength) {
    return `Field length ${fieldName} less or equal ${hasMaxLength} symbols`;
  }
  if (hasMinLength) {
    return `Field length ${fieldName} grater or equal ${hasMinLength} symbols`;
  }
  return 'Invalid value';
};

router.post(
  '',
  [
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
  ],
  validatorErrorHandlerMiddleware,
  createExtraFeature,
);

router.get(
  '/:id',
  objectIdParamValidationMiddleware(),
  getExtraFeatureById,
);

router.patch(
  '/:id',
  objectIdParamValidationMiddleware(),
  [
    check('title', 'incorrect title, min 3 symbols max 20').isLength({ min: 3, max: 20 }),
    check('description', 'incorrect description, min 3 symbols, max 120symbol').isLength({ min: 3, max: 120 }),
  ],
  updateExtraFeature,
);

router.delete(
  '/:id',
  objectIdParamValidationMiddleware(),
  removeExtraFeature,
);

router.post(
  '/search',
  searchRequestValidation,
  validatorErrorHandlerMiddleware,
  searchExtraFeature,
);

module.exports = router;
