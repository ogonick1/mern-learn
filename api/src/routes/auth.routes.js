const { Router } = require('express');
const { login, registration } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', login);
router.post('/registration', registration);

module.exports = router;
