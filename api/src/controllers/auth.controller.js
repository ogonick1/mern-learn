const authService = require('../services/auth.service');

const loginController = async (req, res) => {
  const authToken = await authService.loginService(req, res);
  return res.json({ authToken });
};

const registration = async (req, res) => {
  const authToken = await authService.registration(req, res);
  return res.json({ authToken });
};

module.exports = {
  loginController,
  registration,
};
