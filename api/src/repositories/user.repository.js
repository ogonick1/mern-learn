const { UserModel } = require('../models/User');

const create = (model) => {
  const {
    email,
    hashedPassword,
    userName,
    firstName,
    lastName,
  } = model;

  return new UserModel({
    email,
    password: hashedPassword,
    userName,
    firstName,
    lastName,
  }).save();
};

const findOne = (filter) => {
  return UserModel.findOne(filter).lean();
};

module.exports = {
  create,
  findOne,
};
