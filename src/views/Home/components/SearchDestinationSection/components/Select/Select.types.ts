export interface Language {
  flag: string;
  language: 'English' | 'Polish';
  languageCode: 'en' | 'pl';
}

export interface Currency {
  currency: string;
  currencyCode: 'USD' | 'GBP' | 'EUR' | 'PLN';
  currencyIcon: string;
}
