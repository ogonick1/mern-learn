const getStringLengthValidationMessage = ({
  minLength,
  maxLength,
  fieldName,
}) => {
  const hasMinLength = typeof minLength === 'number';
  const hasMaxLength = typeof maxLength === 'number';
  if (hasMinLength && hasMaxLength) {
    return `Field length ${fieldName} must be between ${minLength} and ${maxLength}`;
  }
  if (hasMaxLength) {
    return `Field length ${fieldName} less or equal ${hasMaxLength} symbols`;
  }
  if (hasMinLength) {
    return `Field length ${fieldName} grater or equal ${hasMinLength} symbols`;
  }
  return ` ${fieldName} Invalid value`;
};

module.exports = {
  getStringLengthValidationMessage,
};
