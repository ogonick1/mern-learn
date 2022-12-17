const mockUser = {
  _id: 'id',
  login: 'login',
  password: 'password',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
};

const create = async (createModel) => {
  console.log(createModel);
  return Promise.resolve(mockUser);
};

const getById = (id) => {
  console.log(id);
  return Promise.resolve(mockUser);
};

module.exports = {
  create,
  getById,
};
