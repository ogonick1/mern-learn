const bcrypt = require('bcryptjs');
const { BadRequestError, NotFoundError } = require('../errors');
const { errorCodes } = require('../errors/error-codes');
const userRepository = require('../repositories/user.repository');

const loginService = async (req) => {
  const { email, password } = req.body;
  const user = await userRepository._findOne({ email });

  if (!user) {
    throw new NotFoundError({
      errorCode: errorCodes.USER_BY_EMAIL_NOT_FOUND,
      message: 'invalid email or password try again',
      details: {
        email,
      },
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new BadRequestError({
      message: 'invalid email or password, try again',
    });
  }

  const token = userRepository.createToken(user);
  return token;
};

const registration = async (req) => {
  const {
    email, password, login, firstName, lastName,
  } = req.body;

  const candidate = await userRepository._findOne({ email });

  if (candidate) {
    throw new BadRequestError({
      message: 'email already registered',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userRepository._create({
    email, hashedPassword, login, firstName, lastName,
  });
  const token = userRepository.createToken(user);
  return token;
};

module.exports = {
  loginService,
  registration,
};
