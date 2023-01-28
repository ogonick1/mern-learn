import * as yup from 'yup';

export const getValidationSchema = (t) => {
  return yup
    .object()
    .shape({
      title: yup.string()
        .required(t('validationErrors:validationErrors.required'))
        .min(3, t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 20 }))
        .max(20, t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 20 })),
      description: yup.string()
        .required(t('validationErrors:validationErrors.required'))
        .min(3, t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 200 }))
        .max(200, t('validationErrors:validationErrors.minMaxLength', { min: 3, max: 200 })),
    });
};
