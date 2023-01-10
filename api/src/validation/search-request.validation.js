const { check } = require('express-validator');

const searchRequestValidation = [
  check('limit', 'Must be integer').optional().isInt(),
  check('offset', 'Must be integer').optional().isInt(),
  check('sortField', 'Must be string').optional().isString(),
  check('descending', 'Must be boolean').optional().isBoolean(),
];

module.exports = {
  searchRequestValidation,
};
