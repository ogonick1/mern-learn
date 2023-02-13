const getMongoIdInvalidFieldMessage = (fieldName) => `Field "${fieldName}" must be valid MongoId`;

const getDateInvalidFieldMessage = (fieldName) => `Field "${fieldName}" must be valid Date`;

const getIntInvalidFieldMessage = ({
  fieldName,
  min,
  max,
}) => {
  let result = `Field "${fieldName}" must be valid integer.`;

  if (typeof min === 'number' && typeof max === 'number') {
    result += `With value between ${min} and ${max}`;
  } else if (typeof min === 'number') {
    result += `With value between more or equal ${min}`;
  } else if (typeof max === 'number') {
    result += `With value between less or equal ${max}`;
  }

  return result;
};

const getEnumInvalidFieldMessage = ({
  fieldName,
  validValues = [],
}) => {
  return `Field "${fieldName}" must be equals one of ${validValues.join(', ')}`;
};

module.exports = {
  getMongoIdInvalidFieldMessage,
  getIntInvalidFieldMessage,
  getEnumInvalidFieldMessage,
  getDateInvalidFieldMessage,
};
