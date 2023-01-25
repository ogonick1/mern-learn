import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FuelType } from '../../enums/FuelType.enum';

const optionsValues = [
  FuelType.PETROL,
  FuelType.DIESEL,
  FuelType.GAS,
  FuelType.HYBRID,
  FuelType.ELECTRO,
  FuelType.GAS_PETROL,
];

export const useFuelTypeOptions = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return optionsValues.map((value) => ({
      title: t(`enums.FuelType.${value}`),
      value,
    }));
  }, [t]);
};
