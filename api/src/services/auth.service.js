const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const userRepository = require('../repositories/user.repository');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.getByEmail({ email });

  if (!user) {
    return res.status(400).json({ message: 'user email not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: 'invalid password, try again' });
  }

  const token = jwt.sign(
    {
      userId: user.id,
      userLogin: user.login,
      userFirstName: user.firstName,
      userLastName: user.lastName,
    },
    config.get('jwtSecretKey'),
    { expiresIn: '11h' },
  );
  return token;
};

const registration = async (req) => {
  const user = await userRepository.create(req);
  console.log(user);
};

module.exports = {
  login,
  registration,
};
