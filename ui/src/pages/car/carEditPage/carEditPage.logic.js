export const mapFormToInsertModel = (form) => {
  return {
    carModelId: form.carModelOption.id,
    powerUnit: form.powerUnit,
    bodyType: form.bodyType,
    extraFeaturesIds: form.extraFeaturesOptions.map(({ id }) => id),
    year: 2000,
    color: '#d00',
    plateNumber: 'AX1111XA',
    plateNumberRegistrationDate: new Date().toISOString(),

    // year: form.year,
    // color: form.color,
    // plateNumber: form.plateNumber,
    // plateNumberRegistrationDate: form.plateNumberRegistrationDate,
  };
};

export const mapCarToFormValues = (model) => {
  console.log(model.extraFeaturesIds);
  return {
    carModelOption: model.carModelId,
    powerUnit: model.powerUnit,
    year: new Date(model.year),
    bodyType: model.bodyType,
    extraFeaturesOptions: model.extraFeaturesIds,
  };
};
