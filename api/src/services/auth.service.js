const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const userRepository = require('../repositories/user.repository');
const {
  throwAuthError,
  throwEmailReady,
} = require('../errors/errors-builders/auth.errors-builders');

const createToken = (user) => {
  const {
    id,
    userName,
    firstName,
    lastName,
  } = user;

  const jwtSecretKey = config.get('jwtSecretKey');
  const expiresIn = config.get('expiresIn');

  return (
    jwt.sign(
      {
        userId: id,
        userLogin: userName,
        userFirstName: firstName,
        userLastName: lastName,
      },
      jwtSecretKey,
      { expiresIn },
    )
  );
};

const login = async (req) => {
  const { email, password } = req.body;
  const user = await userRepository.findOne({ email });

  if (!user) {
    throwAuthError();
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throwAuthError();
  }

  return createToken(user);
};

const registration = async (req) => {
  const {
    email,
    password,
    userName,
    firstName,
    lastName,
  } = req.body;

  const candidate = await userRepository.findOne({ email });

  if (candidate) {
    throwEmailReady();
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository.create({
    email,
    hashedPassword,
    userName,
    firstName,
    lastName,
  });

  return createToken(user);
};

module.exports = {
  login,
  registration,
};
