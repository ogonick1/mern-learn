import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DriveType } from '../../enums/DriveType.enum';

const optionsValues = [
  DriveType.FRONT,
  DriveType.BACK,
  DriveType.FULL,
];

export const useDriveTypeOptions = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return optionsValues.map((value) => ({
      title: t(`enums.DriveType.${value}`),
      value,
    }));
  }, [t]);
};
