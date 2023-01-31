const { Router } = require('express');
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
const {
  extraFeatureCreateUpdateDtoValidations,
} = require('../request-dto-validation/extraFeatureCreateUpdate.dto.validations');

const router = Router();

router.post(
  '',
  extraFeatureCreateUpdateDtoValidations,
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
  extraFeatureCreateUpdateDtoValidations,
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
