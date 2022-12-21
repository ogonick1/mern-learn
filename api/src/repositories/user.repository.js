const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const _create = (model) => {
  const {
    email,
    hashedPassword,
    login,
    firstName,
    lastName,
  } = model;

  return new User({
    email,
    password: hashedPassword,
    login,
    firstName,
    lastName,
  }).save();
};
const createToken = (user) => {
  const {
    id,
    login,
    firstName,
    lastName,
  } = user;

  return (
    jwt.sign(
      {
        userId: id,
        userLogin: login,
        userFirstName: firstName,
        userLastName: lastName,
      },
      config.get('jwtSecretKey'),
      { expiresIn: '11h' },
    )
  );
};

const _findOne = (filter) => {
  return User.findOne(filter).lean();
};

module.exports = {
  _create,
  _findOne,
  createToken,
};
