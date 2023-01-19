import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GearBox } from '../../enums/GearBox.enum';

const optionsValues = [
  GearBox.MECHANICAL,
  GearBox.AUTOMATIC,

];

export const useGearBoxOptions = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return optionsValues.map((value) => ({
      title: t(`enum.GearBox.${value}`),
      value,
    }));
  }, [t]);
};
