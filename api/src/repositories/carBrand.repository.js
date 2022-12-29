const { CarBrandModel } = require('../models/CarBrand');

const create = (model) => {
  const { name, country } = model;
  return new CarBrandModel({ name, country }).save();
};

const findById = (id) => {
  return CarBrandModel.findById(id);
};

const update = (id, model) => {
  return CarBrandModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return CarBrandModel.findByIdAndDelete(id);
};

module.exports = {
  create,
  findById,
  update,
  remove,
};
