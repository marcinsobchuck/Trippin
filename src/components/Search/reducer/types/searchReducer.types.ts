import { SearchActions } from "../enums/searchActions.enum";

export type SearchState = {
  place: string;
  hasRecommendedPlaceChanged: boolean;
};
export interface SetPlaceAction {
  type: SearchActions.SET_PLACE;
  payload: string;
}

export interface SetHasRecommendedPlaceChangedAction {
  type: SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED;
  payload: boolean;
}

export type SearchAction = SetPlaceAction | SetHasRecommendedPlaceChangedAction;
