const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { BadRequestError } = require('../errors');
const { errorCodes } = require('../errors/error-codes');
const userRepository = require('../repositories/user.repository');

const createToken = (user) => {
  const {
    id,
    userName,
    firstName,
    lastName,
  } = user;

  return (
    jwt.sign(
      {
        userId: id,
        userLogin: userName,
        userFirstName: firstName,
        userLastName: lastName,
      },
      config.get('jwtSecretKey'),
      { expiresIn: config.get('expiresIn') },
    )
  );
};

const login = async (req) => {
  const { email, password } = req.body;
  const user = await userRepository.findOne({ email });

  if (!user) {
    throw new BadRequestError({
      errorCode: errorCodes.LOGIN_ERROR,
      message: 'Invalid email or password try again',
      details: {},
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new BadRequestError({
      errorCode: errorCodes.LOGIN_ERROR,
      message: 'Invalid email or password try again',
      details: {},
    });
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
    throw new BadRequestError({
      message: 'Email already registered',
      errorCode: errorCodes.EMAIL_ALREADY_EXISTED,
    });
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
