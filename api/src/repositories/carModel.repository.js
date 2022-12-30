const { CarModelModel } = require('../models/CarModel');

const create = (model) => {
  return new CarModelModel(model).save();
};

const findById = (id) => {
  return CarModelModel
    .findById(id)
    .populate('brandId')
    .populate('extraFeaturesIds')
    .lean()
    .exec();
};

module.exports = {
  create,
  findById,
};