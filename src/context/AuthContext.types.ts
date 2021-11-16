import firebase from "firebase/app";
import usaFlag from "src/assets/images/usaFlag.png";
import polishFlag from "src/assets/images/polishFlag.png";
import dollar from "src/assets/images/dollar.png";
import euro from "src/assets/images/euro.png";
import zloty from "src/assets/images/zloty.png";
import pound from "src/assets/images/pound.png";

export interface RegionalSettingsTypes {
  language: {
    language: "English" | "Polish";
    languageCode: "en" | "pl";
    flag: typeof usaFlag | typeof polishFlag;
  };
  currency: {
    currency: string;
    currencyCode: "USD" | "GBP" | "EUR" | "PLN";
    currencyIcon: typeof dollar | typeof euro | typeof zloty | typeof pound;
  };
}

export interface AuthContextType {
  currentUser: firebase.User | null;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
  setIsFirstEntry: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstEntry: boolean;
  regionalSettings: RegionalSettingsTypes;
  setRegionalSettings: React.Dispatch<
    React.SetStateAction<RegionalSettingsTypes>
  >;
}
