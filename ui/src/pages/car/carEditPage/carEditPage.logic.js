export const mapFormToInsertModel = (form) => {
  return {
    carModelId: form.carModelOption.id,
    powerUnit: form.powerUnit,
    bodyType: form.bodyType,
    extraFeaturesIds: form.extraFeaturesOptions.map(({ id }) => id),
    year: form.year?.getFullYear(),
    color: form.color,
    plateNumber: form.plateNumber,
    plateNumberRegistrationDate: form.plateNumberRegistrationDate,
  };
};

export const mapCarToFormValues = (model) => {
  return {
    carModelOption: model.carModelId,
    powerUnit: model.powerUnit,
    year: new Date(`02-02-${model.year}`),
    bodyType: model.bodyType,
    extraFeaturesOptions: model.extraFeaturesIds,
    color: model.color,
    plateNumber: model.plateNumber,
    plateNumberRegistrationDate: new Date(model.plateNumberRegistrationDate),
  };
};
