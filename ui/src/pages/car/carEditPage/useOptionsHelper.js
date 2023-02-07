import { useTranslation } from 'react-i18next';

export const useOptionsHelper = () => {
  const { t } = useTranslation('enums');

  const getPowerUnitOptionLabel = (powerUnit) => {
    if (!powerUnit) {
      return '';
    }
    return `${powerUnit.engineVolume}-${powerUnit.driveType}-${powerUnit.fuelType}-${powerUnit.gearBox}`;
  };

  const getBodyTypeOptionLabel = (bodyType) => {
    return t(`enums.BodyType.${bodyType}`);
  };

  return {
    getPowerUnitOptionLabel,
    getBodyTypeOptionLabel,
  };
};
