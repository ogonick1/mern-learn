const bcrypt = require('bcryptjs');
const User = require('../models/User');

// const mockUser = {
//   _id: 'id',
//   login: 'login',
//   password: 'password',
//   email: 'email',
//   firstName: 'firstName',
//   lastName: 'lastName',
// };

const create = async (req, res) => {
  const {
    email, password, login, firstName, lastName,
  } = req.body;

  const candidate = await User.findOne({ email });

  if (candidate) {
    return res.status(400).json({ message: 'this email is already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email, password: hashedPassword, login, firstName, lastName,
  });
  await user.save();
  return Promise.resolve(User);
};

const getByEmail = (email) => {
  return Promise.resolve(User.findOne(email));
};

module.exports = {
  create,
  getByEmail,
};
