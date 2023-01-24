import * as yup from 'yup';

export const getValidationSchema = (t) => {
  return yup
    .object()
    .shape({
      name: yup.string()
        .required(t('validationErrors.required'))
        .min(3, t('validationErrors.minMaxLength', { min: 3, max: 20 }))
        .max(20, t('validationErrors.minMaxLength', { min: 3, max: 20 })),
      yearStart: yup.date('error')
        .typeError()
        .min(1970)
        .required(t('validationErrors.required')),
      yearEnd: yup.date()
        .optional()
        .typeError()
        .when('yearStart', (yearStart, field) => (yearStart ? field.min(yup.ref('yearStart'), t('validationErrors.yearsEnd')) : field)),
      brandOption: yup.object()
        .required(t('validationErrors.required')),
      extraFeaturesOptions: yup.array(),
      powerUnits: yup.array()
        .of(
          yup.object().shape({
            engineVolume: yup.number(t('validationErrors.volume'))
              .typeError(t('validationErrors.volume'))
              .integer(t('validationErrors.volume'))
              .positive(t('validationErrors.volume'))
              .max(10000, t('validationErrors.volume')),
            fuelType: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors.required')),
            gearBox: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors.required')),
            driveType: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors.required')),
          }),
        ),
      bodyTypes: yup.array().min(1, t('validationErrors.required')).required(t('validationErrors.required')),
    });
};
