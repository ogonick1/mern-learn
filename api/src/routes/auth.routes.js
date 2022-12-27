const { Router } = require('express');
const { check } = require('express-validator');
const { login, registration } = require('../controllers/auth.controller');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validator-error-handler.middleware');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'incorrect email address').isEmail(),
    check('password', 'incorrect password, min 5 symbols').isLength({ min: 5 }),
  ],
  validatorErrorHandlerMiddleware,
  login,
);
router.post(
  '/registration',
  [
    check('email', 'incorrect email address').isEmail(),
    check('password', 'incorrect password, min 5 symbols').isLength({ min: 5 }),
    check('userName', 'incorrect name').isLength({ min: 2 }),
    check('firstName', 'incorrect name').isLength({ min: 2 }),
    check('lastName', 'incorrect lastName').isLength({ min: 3 }),
  ],
  validatorErrorHandlerMiddleware,
  registration,
);

module.exports = router;
