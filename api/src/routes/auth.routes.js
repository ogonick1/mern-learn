const { Router } = require('express');
const { check } = require('express-validator');
const { loginController, registration } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'incorrect email address').isEmail(),
    check('password', 'incorrect password, min 5 symbols').isLength({ min: 5 }),
  ],
  loginController,
);
router.post(
  '/registration',
  [
    check('email', 'incorrect email address').isEmail(),
    check('password', 'incorrect password, min 5 symbols').isLength({ min: 5 }),
    check('login', 'incorrect name').isLength({ min: 2 }),
    check('firstName', 'incorrect name').isLength({ min: 2 }),
    check('lastName', 'incorrect lastName').isLength({ min: 3 }),
  ],
  registration,
);

module.exports = router;
