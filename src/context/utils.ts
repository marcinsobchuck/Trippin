import dollar from 'src/assets/images/dollar.png';
import polishFlag from 'src/assets/images/polishFlag.png';
import usaFlag from 'src/assets/images/usaFlag.png';
import zloty from 'src/assets/images/zloty.png';

import { RegionalSettingsTypes } from './AuthContext.types';

export const getRegionalSettings = (): RegionalSettingsTypes => {
  if (window.navigator.language === 'pl') {
    return {
      language: {
        languageCode: 'pl',
        flag: polishFlag,
        language_key: 'views.home.languages.polish',
      },
      currency: {
        currency_key: 'views.home.currencies.polishZloty',
        currencyCode: 'PLN',
        currencyIcon: zloty,
      },
    };
  }
  return {
    language: {
      languageCode: 'en',
      flag: usaFlag,
      language_key: 'views.home.languages.english',
    },
    currency: {
      currency_key: 'views.home.currencies.dollar',
      currencyCode: 'USD',
      currencyIcon: dollar,
    },
  };
};
