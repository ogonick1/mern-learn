export const mapFormToInsertModel = (form) => {
  return {
    carModelId: form.carModelId.id,
    powerUnit: {
      engineVolume: form.powerUnit.engineVolume,
      fuelType: form.powerUnit.fuelType.value,
      gearBox: form.powerUnit.gearBox.value,
      driveType: form.powerUnit.driveType.value,
    },
    year: form.year,
    bodyType: form.bodyType,
    extraFeaturesIds: form.extraFeaturesOptions.map(({ id }) => id),
    color: form.color,
    plateNumber: form.plateNumber,
    plateNumberRegistrationDate: form.plateNumberRegistrationDate,
  };
};
export const mapCarToFormValues = ({
  model,
  fuelTypeOptions,
  gearBoxOptions,
  driveTypeOptions,
  bodyTypeOptions,
}) => {
  return {
    carModelId: model.carModelId.id,
    powerUnit: {
      engineVolume: model.powerUnit.engineVolume,
      fuelType: fuelTypeOptions
        .find((fuelTypeOption) => fuelTypeOption.value === model.powerUnit.fuelType),
      gearBox: gearBoxOptions
        .find((gearBoxOption) => gearBoxOption.value === model.powerUnit.gearBox),
      driveType: driveTypeOptions
        .find((driveTypeOption) => driveTypeOption.value === model.powerUnit.driveType),
    },
    year: new Date(model.year),
    bodyType: bodyTypeOptions.find((bodyTypeOption) => bodyTypeOption.value === model.bodyType),
    extraFeaturesOptions: model.extraFeaturesIds.map((extraFeature) => extraFeature),
    color: model.color,
    plateNumber: model.plateNumber,
    plateNumberRegistrationDate: model.plateNumberRegistrationDate,
  };
};
