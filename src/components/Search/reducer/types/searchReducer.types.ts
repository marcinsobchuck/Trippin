import { CabinClassText } from "../../components/SearchFormFlightSettingsModal/config";
import { SearchActions } from "../enums/searchActions.enum";

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export type CodeType = "M" | "W" | "C" | "F";

export type SortByType = "price" | "duration" | "quality";

export type SortTypeType = 1 | 0;

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
  isParamsEqual: boolean;
  searchFormData: SearchFormData;
  price: {
    min: number;
    max: number;
  };
  rangeSliderValue: number[];
  sort: {
    sortBy: SortByType;
    sortType: SortTypeType;
  };
  directOnly: number | undefined;
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

export interface SetPrice {
  type: SearchActions.SET_PRICE;
  payload: {
    min: number;
    max: number;
  };
}

export interface SetRangeSliderValue {
  type: SearchActions.SET_RANGE_SLIDER_VALUE;
  payload: number[];
}

export interface SetSort {
  type: SearchActions.SET_SORT;
  payload: {
    sortBy: SortByType;
    sortType: SortTypeType;
  };
}

export interface SetIsParamsEqual {
  type: SearchActions.SET_IS_PARAMS_EQUAL;
  payload: boolean;
}

export interface SetDirectOnly {
  type: SearchActions.SET_DIRECT_ONLY;
  payload: number | undefined;
}

export type SearchAction =
  | SetFlightType
  | SetCabinClass
  | SetPassengers
  | SetSearchFormData
  | SetIsFormSubmitting
  | SetPage
  | SetPrice
  | SetRangeSliderValue
  | SetSort
  | SetIsParamsEqual
  | SetDirectOnly;
