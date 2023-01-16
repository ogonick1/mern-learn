const { Router } = require('express');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validatorErrorHandler.middleware');
const { objectIdParamValidationMiddleware } = require('../middlewares/objectIdParamValidation.middleware');
const {
  getCarModel,
  createCarModel,
  updateCarModel,
  removeCarModel,
  searchCarModel,
} = require('../controllers/carModel.controller');
const { carModelCreateUpdateDtoValidation } = require('../request-dto-validation/carModelCreateUpdate.dto.validation');
const { searchRequestValidation } = require('../validation/search-request.validation');

const router = Router();

router.get(
  '/:id',
  objectIdParamValidationMiddleware(),
  getCarModel,
);

router.post(
  '',
  carModelCreateUpdateDtoValidation,
  validatorErrorHandlerMiddleware,
  createCarModel,
);

router.patch(
  '/:id',
  objectIdParamValidationMiddleware(),
  carModelCreateUpdateDtoValidation,
  updateCarModel,
);

router.delete(
  '/:id',
  objectIdParamValidationMiddleware(),
  removeCarModel,
);

router.post(
  '/search',
  searchRequestValidation,
  validatorErrorHandlerMiddleware,
  searchCarModel,
);

module.exports = router;
