const bcrypt = require('bcryptjs');
const User = require('../models/User');

const _create = (model) => {
  const {
    email,
    hashedPassword,
    login,
    firstName,
    lastName,
  } = model;

  const user = new User({
    email,
    password: hashedPassword,
    login,
    firstName,
    lastName,
  }).save();
  return user.save();
};

const _findOne = (filter) => {
  return User.findOne(filter);
};

const create = async (req, res) => {
  const {
    email, password, login, firstName, lastName,
  } = req.body;

  const candidate = await User.findOne({ email });

  if (candidate) {
    return res.status(400).json({ message: 'this email is already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return Promise.resolve(User);
};

const getByEmail = (email) => {
  return Promise.resolve(User.findOne(email));
};

module.exports = {
  create,
  getByEmail,
};
