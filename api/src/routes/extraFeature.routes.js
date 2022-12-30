const { Router } = require('express');
const { check } = require('express-validator');
const {
  createExtraFeature,
  getExtraFeatureById,
  updateExtraFeature,
  removeExtraFeature,
} = require('../controllers/extraFeature.controller');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validatorErrorHandler.middleware');
const { objectIdParamValidationMiddleware } = require('../middlewares/objectIdParamValidation.middleware');

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

module.exports = router;
