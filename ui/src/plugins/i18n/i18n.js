import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ua from './ua';

export const resources = {
  en,
  ua,
};

i18n
  .use(initReactI18next)
  .init({
    ns: [
      'enums',
      'carModel',
      'extraFeature',
      'carBrands',
      'customDialog',
      'loginPage',
      'registrationPage',
      'validationErrors',
      'toast',
      'languages',
      'form',
    ],
    resources,
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
