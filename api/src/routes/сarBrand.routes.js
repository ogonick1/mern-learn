const { Router } = require('express');
const { check } = require('express-validator');
const {
  createCarBrand, getCarBrandById, updateCarBrand, deleteCarBrand,
} = require('../controllers/carBrand.controller');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validator-error-handler.middleware');

const router = Router();

router.post(
  '',
  [
    check('name', 'incorrect password, min 3 symbols').isLength({ min: 3 }),
    check('country', 'incorrect password, min 3 symbols').isLength({ min: 3 }),
  ],
  validatorErrorHandlerMiddleware,
  createCarBrand,
);

router.get(
  '/:id',
  getCarBrandById,
);

router.patch(
  '/:id',
  [
    check('name', 'incorrect password, min 3 symbols').isLength({ min: 3 }),
    check('country', 'incorrect password, min 3 symbols').isLength({ min: 3 }),
  ],
  updateCarBrand,
);

router.delete(
  '/:id',
  deleteCarBrand,
);

module.exports = router;
