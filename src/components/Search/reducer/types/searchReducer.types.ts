import { RecommendedPlace } from "src/shared/types";
import { SearchActions } from "../enums/searchActions.enum";

export type SearchState = {
  place: string;
  currentRecommendedPlace: RecommendedPlace;
  hasRecommendedPlaceChanged: boolean;
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

export type SearchAction =
  | SetPlaceAction
  | SetCurrentRecommendedPlaceAction
  | SetHasRecommendedPlaceChangedAction;
