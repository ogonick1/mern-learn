import * as yup from 'yup';

export const getValidationSchema = (t) => {
  return yup
    .object()
    .shape({
      name: yup.string()
        .required(t('validationErrors:validationErrors.required'))
        .min(3, t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 20 }))
        .max(20, t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 20 })),
      yearStart: yup.date('error')
        .typeError()
        .min(1970)
        .required(t('validationErrors:validationErrors.required')),
      yearEnd: yup.date()
        .optional()
        .typeError()
        .when('yearStart', (yearStart, field) => (yearStart ? field.min(yup.ref('yearStart'), t('validationErrors:validationErrors.yearsEnd')) : field)),
      brandOption: yup.object()
        .required(t('validationErrors:validationErrors.required')),
      extraFeaturesOptions: yup.array(),
      powerUnits: yup.array()
        .of(
          yup.object().shape({
            engineVolume: yup.number(t('validationErrors:validationErrors.volume'))
              .typeError(t('validationErrors:validationErrors.volume'))
              .integer(t('validationErrors:validationErrors.volume'))
              .positive(t('validationErrors:validationErrors.volume'))
              .max(10000, t('validationErrors:validationErrors.volume')),
            fuelType: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors:validationErrors.required')),
            gearBox: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors:validationErrors.required')),
            driveType: yup.object().nullable().shape({
              value: yup.string(),
            })
              .required(t('validationErrors:validationErrors.required')),
          }),
        ),
      bodyTypes: yup.array().min(1, t('validationErrors:validationErrors.required')).required(t('validationErrors:validationErrors.required')),
    });
};
