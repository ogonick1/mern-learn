const { ExtraFeatureModel } = require('../models/ExtraFeature');

const create = (model) => {
  const { title, description } = model;
  return new ExtraFeatureModel({ title, description }).save();
};

const findOneByCriteria = (filter = {}) => {
  return ExtraFeatureModel.findOne(filter);
};

const findById = (id) => {
  return ExtraFeatureModel.findById(id);
};
const update = (id, model) => {
  return ExtraFeatureModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return ExtraFeatureModel.findByIdAndDelete(id);
};

const findAllById = (ids) => {
  return ExtraFeatureModel.find({ id: { $in: ids } });
};

module.exports = {
  create,
  findOneByCriteria,
  findById,
  update,
  remove,
  findAllById,
};
