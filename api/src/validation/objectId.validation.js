const { Types } = require('mongoose');

const isObjectId = (id) => Types.ObjectId.isValid(id);

module.exports = {
  isObjectId,
};
