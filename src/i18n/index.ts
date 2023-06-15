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

const settings = window.localStorage.getItem('regionalSettings');

const storedLanguage = settings && JSON.parse(settings).language.languageCode;

i18n.use(initReactI18next).init({
  resources,
  lng: window.navigator.language === 'pl' && storedLanguage === 'pl' ? 'pl' : 'en',
});

export default i18n;
