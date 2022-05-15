import { CodeType, Passengers } from "../../reducer/types/searchReducer.types";
import { CabinClassText } from "../SearchFormFlightSettingsModal/config";

export interface FlightSettings {
  passengers: Passengers;
  code: CodeType;
  text: CabinClassText;
}

export interface SearchFormInitialValues {
  start: {
    id: string;
    text: string;
  };
  destination: {
    id: string;
    text: string;
  };
  date: {
    departDate: string;
    returnDate: string;
  };
  flightType: "round" | "oneway";
  flightSettings: FlightSettings;
}
