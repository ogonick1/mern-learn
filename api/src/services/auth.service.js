const userRepository = require('../repositories/user.repository');

const login = async (model) => {
  console.log(model);
  const user = await userRepository.getById('ID');
  console.log(user);
  return 'AUTH TOKEN AFTER SUCCESS LOGIN';
};

const registration = async (model) => {
  console.log(model);
  const user = await userRepository.create({});
  console.log(user);
  return 'AUTH TOKEN AFTER SUCCESS REGISTRATION';
};

module.exports = {
  login,
  registration,
};
