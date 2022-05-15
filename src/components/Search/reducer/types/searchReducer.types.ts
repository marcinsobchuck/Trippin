import { CabinClassText } from "../../components/SearchFormFlightSettingsModal/config";
import { SearchActions } from "../enums/searchActions.enum";

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export type CodeType = "M" | "W" | "C" | "F";

export interface SearchFormData {
  start: {
    id: string;
    text: string;
  };
  destination: {
    id: string;
    text: string;
  };
  departDate: string;
  returnDate?: string;
}

export type SearchState = {
  page: number;
  flightType: "round" | "oneway";
  passengers: Passengers;
  cabinClass: {
    code: CodeType;
    text: CabinClassText;
  };
  isFormSubmitting: boolean;
  searchFormData: SearchFormData;
  limit: number;
};

export interface SetFlightType {
  type: SearchActions.SET_FLIGHT_TYPE;
  payload: "round" | "oneway";
}

export interface SetPassengers {
  type: SearchActions.SET_PASSENGERS;
  payload: Passengers;
}

export interface SetCabinClass {
  type: SearchActions.SET_CABIN_CLASS;
  payload: {
    code: CodeType;
    text: "Economy" | "Economy premium" | "Business" | "First class";
  };
}

export interface SetSearchFormData {
  type: SearchActions.SET_SEARCH_FORM_DATA;
  payload: SearchFormData;
}

export interface SetLimit {
  type: SearchActions.SET_LIMIT;
  payload: number;
}

export interface SetShowResults {
  type: SearchActions.SET_SHOW_RESULTS;
  payload: boolean;
}

export interface SetIsFormSubmitting {
  type: SearchActions.SET_IS_FORM_SUBMITTING;
  payload: boolean;
}

export interface SetVisibleItems {
  type: SearchActions.SET_VISIBLE_ITEMS;
  payload: any;
}

export interface SetPage {
  type: SearchActions.SET_PAGE;
  payload: number;
}

export type SearchAction =
  | SetFlightType
  | SetCabinClass
  | SetPassengers
  | SetSearchFormData
  | SetLimit
  | SetIsFormSubmitting
  | SetPage;
