const { Router } = require('express');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validatorErrorHandler.middleware');
const { objectIdParamValidationMiddleware } = require('../middlewares/objectIdParamValidation.middleware');
const {
  getCar,
  createCar,
  updateCar,
  removeCar,
  searchCar,
} = require('../controllers/car.controller');
const { carCreateUpdateDtoValidation } = require('../request-dto-validation/carCreateUpdate.dto.validation');
const { searchRequestValidation } = require('../validation/search-request.validation');

const router = Router();

router.get(
  '/:id',
  objectIdParamValidationMiddleware(),
  getCar,
);

router.post(
  '',
  carCreateUpdateDtoValidation,
  validatorErrorHandlerMiddleware,
  createCar,
);

router.patch(
  '/:id',
  objectIdParamValidationMiddleware(),
  carCreateUpdateDtoValidation,
  updateCar,
);

router.delete(
  '/:id',
  objectIdParamValidationMiddleware(),
  removeCar,
);

router.post(
  '/search',
  searchRequestValidation,
  validatorErrorHandlerMiddleware,
  searchCar,
);

module.exports = router;
