const { Router } = require('express');
const { login, registration } = require('../controllers/auth.controller');
const { validatorErrorHandlerMiddleware } = require('../middlewares/validatorErrorHandler.middleware');
const { loginDtoValidation } = require('../request-dto-validation/login.dto.validation');
const { registrationDtoValidation } = require('../request-dto-validation/registration.dto.validation');

const router = Router();

router.post(
  '/login',
  loginDtoValidation,
  validatorErrorHandlerMiddleware,
  login,
);
router.post(
  '/registration',
  registrationDtoValidation,
  validatorErrorHandlerMiddleware,
  registration,
);

module.exports = router;
