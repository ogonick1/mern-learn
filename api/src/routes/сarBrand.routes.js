const { Router } = require('express');
const {
  createCarBrand,
  getCarBrandById,
  updateCarBrand,
  removeCarBrand,
  searchCarBrands,
} = require('../controllers/carBrand.controller');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validatorErrorHandler.middleware');
const { objectIdParamValidationMiddleware } = require('../middlewares/objectIdParamValidation.middleware');
const { searchRequestValidation } = require('../validation/search-request.validation');
const { carBrandDtoValidations } = require('../request-dto-validation/carBrand.dto.validations');

const router = Router();

router.post(
  '',
  carBrandDtoValidations,
  validatorErrorHandlerMiddleware,
  createCarBrand,
);

router.get(
  '/:id',
  objectIdParamValidationMiddleware(),
  getCarBrandById,
);

router.patch(
  '/:id',
  objectIdParamValidationMiddleware(),
  carBrandDtoValidations,
  updateCarBrand,
);

router.delete(
  '/:id',
  objectIdParamValidationMiddleware(),
  removeCarBrand,
);

router.post(
  '/search',
  searchRequestValidation,
  validatorErrorHandlerMiddleware,
  searchCarBrands,
);

module.exports = router;
