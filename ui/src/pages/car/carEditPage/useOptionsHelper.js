import { useTranslation } from 'react-i18next';

export const useOptionsHelper = () => {
  const { t } = useTranslation('enums');

  const getPowerUnitOptionLabel = (powerUnit) => {
    if (!powerUnit) {
      return '';
    }
    return [powerUnit.engineVolume, t(`enums:enums.FuelType.${powerUnit.fuelType}`), t(`enums:enums.GearBox.${powerUnit.gearBox}`), t(`enums:enums.DriveType.${powerUnit.driveType}`)].join('  ');
  };

  const getBodyTypeOptionLabel = (bodyType) => {
    return t(`enums.BodyType.${bodyType}`);
  };

  return {
    getPowerUnitOptionLabel,
    getBodyTypeOptionLabel,
  };
};
