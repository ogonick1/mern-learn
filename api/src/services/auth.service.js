const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { BadRequestError, NotFoundError } = require('../errors');
const { errorCodes } = require('../errors/error-codes');
const userRepository = require('../repositories/user.repository');

const login = async (req) => {
  const { email, password } = req.body;
  const user = await userRepository.getByEmail({ email });

  if (!user) {
    throw new NotFoundError({
      errorCode: errorCodes.USER_BY_EMAIL_NOT_FOUND,
      message: 'user email not found',
      details: {
        email,
      },
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new BadRequestError({
      message: 'invalid password, try again',
    });
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
