import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';
import ua from './ua';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ua: { translation: ua },
    },
    lng: 'en',
    fallbackLng: 'en',
  });

export default i18n;
