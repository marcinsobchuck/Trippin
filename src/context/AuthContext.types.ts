import { User, UserCredential } from 'firebase/auth';

import dollar from 'src/assets/images/dollar.png';
import euro from 'src/assets/images/euro.png';
import polishFlag from 'src/assets/images/polishFlag.png';
import pound from 'src/assets/images/pound.png';
import usaFlag from 'src/assets/images/usaFlag.png';
import zloty from 'src/assets/images/zloty.png';

import { CurrencyCode, LanguageCode } from 'src/apiServices/types/kiwiApi.types';

export interface Language {
  languageCode: LanguageCode;
  flag: typeof usaFlag | typeof polishFlag;
  language_key: string;
}

export interface Currency {
  currency_key: string;
  currencyCode: CurrencyCode;
  currencyIcon: typeof dollar | typeof euro | typeof zloty | typeof pound;
}
export interface RegionalSettingsTypes {
  language: Language;
  currency: Currency;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  setIsFirstEntry: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstEntry: boolean;
  regionalSettings: RegionalSettingsTypes;
  setRegionalSettings: React.Dispatch<React.SetStateAction<RegionalSettingsTypes>>;
}
