const User = require('../models/User');

const create = (model) => {
  const {
    email,
    hashedPassword,
    userName,
    firstName,
    lastName,
  } = model;

  return new User({
    email,
    password: hashedPassword,
    userName,
    firstName,
    lastName,
  }).save();
};

const findOne = (filter) => {
  return User.findOne(filter).lean();
};

module.exports = {
  create,
  findOne,
};
