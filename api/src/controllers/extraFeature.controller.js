const extraFeatureService = require('../services/extraFeature.service');

const mapExtraFeatureDocumentToResponseDto = (extraFeature) => ({
  id: extraFeature._id,
  title: extraFeature.title,
  description: extraFeature.description,
});

const createExtraFeature = async (req, res) => {
  const { title, description } = req.body;

  const extraFeature = await extraFeatureService.create({ title, description });
  return res.json(mapExtraFeatureDocumentToResponseDto(extraFeature));
};

const getExtraFeatureById = async (req, res) => {
  const { id } = req.params;
  const extraFeature = await extraFeatureService.findById(id);
  return res.json(mapExtraFeatureDocumentToResponseDto(extraFeature));
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
    stringFilters,
  } = req.body;
  const [extraFeature, count] = await extraFeatureService.search({
    limit,
    offset,
    sortField,
    descending,
    stringFilters,
  });
  return res.json({
    count,
    extraFeature: extraFeature.map(mapExtraFeatureDocumentToResponseDto),
  });
};

module.exports = {
  createExtraFeature,
  getExtraFeatureById,
  updateExtraFeature,
  removeExtraFeature,
  searchExtraFeature,
};
