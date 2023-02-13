import * as yup from 'yup';

export const getValidationSchema = (t) => {
  return yup
    .object()
    .shape({
      carModelOption: yup.object().required(t('validationErrors:validationErrors.required')),
      powerUnit: yup.object().required(t('validationErrors:validationErrors.required')),
      bodyType: yup.string().required(t('validationErrors:validationErrors.required')),
      extraFeaturesOptions: yup.array(),
      year: yup.date('error date')
        .typeError()
        .min(1970)
        .required(t('validationErrors:validationErrors.required')),
      color: yup.string().required(t('validationErrors:validationErrors.required')),
      plateNumber: yup.string().required(t('validationErrors:validationErrors.required')),
      plateNumberRegistrationDate: yup.date('error date')
        .typeError()
        .min(1970)
        .required(t('validationErrors:validationErrors.required')),
    });
};
