const { Router } = require('express');
const { check } = require('express-validator');
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

const router = Router();

router.post(
  '',
  [
    check('name', 'incorrect name, min 3 symbols').isLength({ min: 3 }),
    check('country', 'incorrect country, min 3 symbols').isLength({ min: 3 }),
  ],
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
  [
    check('name', 'incorrect password, min 3 symbols').isLength({ min: 3 }),
    check('country', 'incorrect password, min 3 symbols').isLength({ min: 3 }),
  ],
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
