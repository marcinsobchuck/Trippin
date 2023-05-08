import dollar from 'src/assets/images/dollar.png';
import euro from 'src/assets/images/euro.png';
import polishFlag from 'src/assets/images/polishFlag.png';
import pound from 'src/assets/images/pound.png';
import usaFlag from 'src/assets/images/usaFlag.png';
import zloty from 'src/assets/images/zloty.png';

import { Currency, Language } from 'src/context/AuthContext.types';

export const currencies: Currency[] = [
  { currencyIcon: dollar, currency_key: 'views.home.currencies.dollar', currencyCode: 'USD' },
  { currencyIcon: euro, currency_key: 'views.home.currencies.euro', currencyCode: 'EUR' },
  { currencyIcon: zloty, currency_key: 'views.home.currencies.polishZloty', currencyCode: 'PLN' },
  { currencyIcon: pound, currency_key: 'views.home.currencies.britishPound', currencyCode: 'GBP' },
];

export const languages: Language[] = [
  { flag: usaFlag, languageCode: 'en', language_key: 'views.home.languages.english' },
  { flag: polishFlag, languageCode: 'pl', language_key: 'views.home.languages.polish' },
];
