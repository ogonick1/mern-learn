const authService = require('../services/auth.service');

const login = async (req, res) => {
  const authToken = await authService.login(req, res);
  return res.json({ authToken });
};

const registration = async (req, res) => {
  const authToken = await authService.registration(req, res);
  return res.json({ authToken });
};

module.exports = {
  login,
  registration,
};
