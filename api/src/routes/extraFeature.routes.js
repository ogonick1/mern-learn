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

router.post(
  '',
  [
    check('title', 'incorrect title, min 3 symbols max 20').isLength({ min: 3, max: 20 }),
    check('description', 'incorrect description, min 3 symbols, max 120symbol').isLength({ min: 3, max: 120 }),
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
