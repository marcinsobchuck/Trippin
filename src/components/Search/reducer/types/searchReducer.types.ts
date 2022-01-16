import { RecommendedPlace } from "src/shared/types";
import { SearchActions } from "../enums/searchActions.enum";

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export type CodeType = "M" | "W" | "C" | "F";

export type SearchState = {
  place: string;
  currentRecommendedPlace: RecommendedPlace;
  hasRecommendedPlaceChanged: boolean;
  flightType: "round" | "oneway";
  passengers: Passengers;
  cabinClass: {
    code: CodeType;
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

export interface SetPassengers {
  type: SearchActions.SET_PASSENGERS;
  payload: Passengers;
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
    code: CodeType;
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
  | SetCabinClass
  | SetPassengers;
