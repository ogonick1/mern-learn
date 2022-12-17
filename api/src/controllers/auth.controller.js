const authService = require('../services/auth.service');

// validate body
const login = async (req, res) => {
  const authToken = await authService.login(req.body);
  res.send({ authToken });
};

const registration = async (req, res) => {
  const result = await authService.registration(req.body);
  console.log(result);
  res.send('registration');
};

module.exports = {
  login,
  registration,
};
