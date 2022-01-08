import usaFlag from "src/assets/images/usaFlag.png";
import polishFlag from "src/assets/images/polishFlag.png";
import dollar from "src/assets/images/dollar.png";
import euro from "src/assets/images/euro.png";
import zloty from "src/assets/images/zloty.png";
import pound from "src/assets/images/pound.png";

export interface initialValuesTypes {
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
