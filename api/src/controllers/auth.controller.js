const { validationResult } = require('express-validator');
const authService = require('../services/auth.service');
// const User = require('../models/User');

// validate body
const loginController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const authToken = await authService.login(req, res);
    return res.json({ authToken });
  } catch (error) {
    res.status(500).json({ message: 'server errors, try later' });
  }
};

const registration = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await authService.registration(req, res);
    console.log(result);
    res.status(201).json({ message: 'user created' });
    res.send('registration');
  } catch (error) {
    res.status(500).json({ message: 'server errors, try later' });
  }
};

module.exports = {
  loginController,
  registration,
};
