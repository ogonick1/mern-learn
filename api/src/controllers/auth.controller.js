const authService = require('../services/auth.service');

const loginController = async (req, res) => {
  const authToken = await authService.login(req, res);
  return res.json({ authToken });
};

const registration = async (req, res) => {
  await authService.registration(req, res);
  res.status(201).json({ message: 'User created' });
};

module.exports = {
  loginController,
  registration,
};
