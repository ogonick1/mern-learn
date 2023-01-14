const extraFeatureService = require('../services/extraFeature.service');

const createExtraFeature = async (req, res) => {
  const { title, description } = req.body;

  const extraFeature = await extraFeatureService.create({ title, description });
  return res.json({
    id: extraFeature._id,
    title: extraFeature.title,
    description: extraFeature.description,
  });
};

const getExtraFeatureById = async (req, res) => {
  const { id } = req.params;
  const extraFeature = await extraFeatureService.findById(id);
  return res.json({
    id: extraFeature._id,
    title: extraFeature.title,
    description: extraFeature.description,
  });
};

const updateExtraFeature = async (req, res) => {
  const { title, description } = req.body;
  const { id } = req.params;
  await extraFeatureService.update(id, { title, description });
  return res.status(204).send();
};

const removeExtraFeature = async (req, res) => {
  const { id } = req.params;
  await extraFeatureService.remove(id);
  return res.status(204).send();
};

const searchExtraFeature = async (req, res) => {
  const {
    limit,
    offset,
    sortField,
    descending,
  } = req.body;
  const [extraFeature, count] = await extraFeatureService.search({
    limit,
    offset,
    sortField,
    descending,
  });
  return res.json({
    count,
    extraFeature,
  });
};

module.exports = {
  createExtraFeature,
  getExtraFeatureById,
  updateExtraFeature,
  removeExtraFeature,
  searchExtraFeature,
};
