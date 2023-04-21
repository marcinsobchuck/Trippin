import dollar from 'src/assets/images/dollar.png';
import euro from 'src/assets/images/euro.png';
import polishFlag from 'src/assets/images/polishFlag.png';
import pound from 'src/assets/images/pound.png';
import usaFlag from 'src/assets/images/usaFlag.png';
import zloty from 'src/assets/images/zloty.png';

import { Currency, Language } from './Select.types';

export const currencies: Currency[] = [
  { currencyIcon: dollar, currency: 'U.S. Dollar', currencyCode: 'USD' },
  { currencyIcon: euro, currency: 'Euro', currencyCode: 'EUR' },
  { currencyIcon: zloty, currency: 'Polish zloty', currencyCode: 'PLN' },
  { currencyIcon: pound, currency: 'British pound', currencyCode: 'GBP' },
];

export const languages: Language[] = [
  { flag: usaFlag, language: 'English', languageCode: 'en' },
  { flag: polishFlag, language: 'Polish', languageCode: 'pl' },
];
