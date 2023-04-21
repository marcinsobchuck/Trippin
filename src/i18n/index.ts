import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from 'src/assets/translations/enTranslations.json';
import plTranslations from 'src/assets/translations/plTranslations.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  pl: {
    translation: plTranslations,
  },
};

const regionalSettings = window.localStorage.getItem('regionalSettings');

i18n.use(initReactI18next).init({
  resources,
  lng: regionalSettings ? JSON.parse(regionalSettings).language.languageCode : 'en',
});

export default i18n;
