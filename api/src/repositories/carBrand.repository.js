const { CarBrandModel } = require('../models/CarBrand');

const create = (model) => {
  const {
    name,
    country,
  } = model;

  return new CarBrandModel({
    name,
    country,
  }).save();
};

const findBrandById = (id) => {
  return CarBrandModel.findById({ _id: id });
};
const findUpdate = (req) => {
  const Id = req.params.id;
  const {
    name,
    country,
  } = req;
  return CarBrandModel.findByIdAndUpdate({ _id: Id }, {
    name,
    country,
  });
};

const findDelete = (id) => {
  return CarBrandModel.findByIdAndDelete({ _id: id });
};

module.exports = {
  create,
  findBrandById,
  findUpdate,
  findDelete,
};
