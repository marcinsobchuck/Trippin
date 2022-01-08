import { RecommendedPlace } from "src/shared/types";
import { SearchActions } from "../enums/searchActions.enum";

export type SearchState = {
  place: string;
  currentRecommendedPlace: RecommendedPlace;
  hasRecommendedPlaceChanged: boolean;
  flightType: "round" | "oneway";
  adults: number;
  children: number;
  infants: number;
  cabinClass: {
    code: string;
    text: "Economy" | "Economy premium" | "Business" | "First class";
  }; // M (economy), W (economy premium), C (business), or F (first class)
};
export interface SetPlaceAction {
  type: SearchActions.SET_PLACE;
  payload: string;
}

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

export interface IncrementAdultsNumber {
  type: SearchActions.INCREMENT_ADULTS_NUMBER;
}
export interface IncrementChildrenNumber {
  type: SearchActions.INCREMENT_CHILDREN_NUMBER;
}
export interface IncrementInfantsNumber {
  type: SearchActions.INCREMENT_INFANTS_NUMBER;
}
export interface DecrementAdultsNumber {
  type: SearchActions.DECREMENT_ADULTS_NUMBER;
}
export interface DecrementChildrenNumber {
  type: SearchActions.DECREMENT_CHILDREN_NUMBER;
}
export interface DecrementInfantsNumber {
  type: SearchActions.DECREMENT_INFANTS_NUMBER;
}

export interface SetCabinClass {
  type: SearchActions.SET_CABIN_CLASS;
  payload: {
    code: string;
    text: "Economy" | "Economy premium" | "Business" | "First class";
  };
}

export type SearchAction =
  | SetPlaceAction
  | SetCurrentRecommendedPlaceAction
  | SetHasRecommendedPlaceChangedAction
  | SetFlightType
  | IncrementAdultsNumber
  | IncrementChildrenNumber
  | IncrementInfantsNumber
  | DecrementAdultsNumber
  | DecrementChildrenNumber
  | DecrementInfantsNumber
  | SetCabinClass;
