import { SearchActions } from "./enums/searchActions.enum";
import { SearchAction, SearchState } from "./types/searchReducer.types";

export const initialState: SearchState = {
  place: "",
  hasRecommendedPlaceChanged: false,
};

export const reducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case SearchActions.SET_PLACE:
      return { ...state, place: action.payload };
    case SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED:
      return { ...state, hasRecommendedPlaceChanged: true };
    default:
      return state;
  }
};
