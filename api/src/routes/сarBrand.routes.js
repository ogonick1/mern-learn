const { Router } = require('express');
const { check } = require('express-validator');
const { login, registration } = require('../controllers/auth.controller');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validator-error-handler.middleware');

const router = Router();

router.post(
  '',
  [
    check('email', 'incorrect email address').isEmail(),
    check('password', 'incorrect password, min 5 symbols').isLength({ min: 5 }),
  ],
  validatorErrorHandlerMiddleware,
  // createCarBrand,
);

// router.get(
//   '/:id',
//   getCarBrandById,
// );

// router.patch(
//   '/:id',
//   updateCarBrand,
// );

// router.delete(
//   '/:id',
//   deleteCarBrand,
// );

module.exports = router;
