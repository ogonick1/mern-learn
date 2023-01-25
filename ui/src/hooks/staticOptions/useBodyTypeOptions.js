import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BodyType } from '../../enums/BodyType.enum';

const optionsValues = [
  BodyType.COUPE,
  BodyType.HATCHBACK,
  BodyType.SEDAN,
  BodyType.STATION_WAGON,
];

export const useBodyTypeOptions = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return optionsValues.map((value) => ({
      title: t(`enums.BodyType.${value}`),
      value,
    }));
  }, [t]);
};
