import * as yup from 'yup';

export const getValidationSchema = (t) => {
  return yup
    .object()
    .shape({
      carModelId: yup.string()
        .required(t('validationErrors:validationErrors.required')),
      powerUnit: yup.array()
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
      year: yup.date('error date')
        .typeError()
        .min(1970)
        .required(t('validationErrors:validationErrors.required')),
      bodyType: yup.string().required(t('validationErrors:validationErrors.required')),
      extraFeaturesOptions: yup.array(),
    });
};
