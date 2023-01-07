const { ExtraFeatureModel } = require('../models/ExtraFeature');

const create = (model) => {
  const { title, description } = model;
  return new ExtraFeatureModel({ title, description }).save();
};

const findOneByCriteria = (filter = {}) => {
  return ExtraFeatureModel.findOne(filter).lean().exec();
};

const findById = (id) => {
  return ExtraFeatureModel.findById(id).lean().exec();
};
const update = (id, model) => {
  return ExtraFeatureModel.findByIdAndUpdate(id, model);
};

const remove = (id) => {
  return ExtraFeatureModel.findByIdAndDelete(id);
};

const findManyByIds = (ids) => {
  return ExtraFeatureModel.find({ _id: { $in: ids } }).lean().exec();
};

module.exports = {
  create,
  findOneByCriteria,
  findById,
  update,
  remove,
  findManyByIds,
};
