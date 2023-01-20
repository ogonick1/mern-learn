export const mapFormToInsertModel = (form) => {
  return {
    name: form.name,
    brandId: form.brandOption._id,
    extraFeaturesIds: form.extraFeaturesOptions.map(({ _id }) => _id),
    yearStart: form.yearStart?.getFullYear(),
    yearEnd: form.yearEnd?.getFullYear(),
    powerUnits: form.powerUnits.map((powerUnit) => ({
      engineVolume: powerUnit.engineVolume,
      fuelType: powerUnit.fuelType.value,
      gearBox: powerUnit.gearBox.value,
      driveType: powerUnit.driveType.value,
    })),
    bodyTypes: form.bodyTypes.map(({ value }) => value),
  };
};

export const mapModelToFormValues = ({
  model,
  fuelTypeOptions,
  gearBoxOptions,
  driveTypeOptions,
  bodyTypeOptions,
}) => {
  return {
    name: model.name,
    brandOption: model.brandId,
    extraFeaturesOptions: model.extraFeaturesIds.map((extraFeature) => extraFeature),
    yearStart: new Date(`02-02-${model.yearStart}`),
    yearEnd: new Date(`02-02-${model.yearEnd}`),
    powerUnits: model.powerUnits.map((powerUnit) => ({
      engineVolume: powerUnit.engineVolume,
      fuelType: fuelTypeOptions
        .find((fuelTypeOption) => fuelTypeOption.value === powerUnit.fuelType),
      gearBox: gearBoxOptions
        .find((gearBoxOption) => gearBoxOption.value === powerUnit.gearBox),
      driveType: driveTypeOptions
        .find((driveTypeOption) => driveTypeOption.value === powerUnit.driveType),
    })),
    bodyTypes: model.bodyTypes.map(
      (bodyType) => bodyTypeOptions.find((bodyTypeOption) => bodyTypeOption.value === bodyType),
    ),
  };
};
