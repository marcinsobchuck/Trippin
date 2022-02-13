import { RecommendedPlace } from "src/shared/types";
import { SearchActions } from "../enums/searchActions.enum";

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export type CodeType = "M" | "W" | "C" | "F";

export interface SearchFormData {
  start: string;
  destination: string;
  depart: string;
  return?: string;
}

export type SearchState = {
  currentRecommendedPlace: RecommendedPlace;
  hasRecommendedPlaceChanged: boolean;
  flightType: "round" | "oneway";
  passengers: Passengers;
  cabinClass: {
    code: CodeType;
    text: "Economy" | "Economy premium" | "Business" | "First class";
  }; // M (economy), W (economy premium), C (business), or F (first class)
  searchFormData: SearchFormData;
  limit: number;
  isLoading: boolean;
  isError: boolean;
  showResults: boolean;
  searchResults: any;
  visibleItems: any;
};

export interface SetCurrentRecommendedPlaceAction {
  type: SearchActions.SET_CURRENT_RECOMMENDED_PLACE;
  payload: RecommendedPlace;
}

export interface SetHasRecommendedPlaceChangedAction {
  type: SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED;
  payload: boolean;
}

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

export interface SetIsLoading {
  type: SearchActions.SET_IS_LOADING;
  payload: boolean;
}

export interface SetShowResults {
  type: SearchActions.SET_SHOW_RESULTS;
  payload: boolean;
}

export interface SetSearchResults {
  type: SearchActions.SET_SEARCH_RESULTS;
  payload: any;
}

export interface SetIsError {
  type: SearchActions.SET_IS_ERROR;
  payload: boolean;
}

export interface SetVisibleItems {
  type: SearchActions.SET_VISIBLE_ITEMS;
  payload: any;
}

export type SearchAction =
  | SetCurrentRecommendedPlaceAction
  | SetHasRecommendedPlaceChangedAction
  | SetFlightType
  | SetCabinClass
  | SetPassengers
  | SetSearchFormData
  | SetLimit
  | SetIsLoading
  | SetShowResults
  | SetSearchResults
  | SetIsError
  | SetVisibleItems;
