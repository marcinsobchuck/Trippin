import { recommendedPlacesArray } from "../components/SearchDestinationSection/config";
import { SearchActions } from "./enums/searchActions.enum";
import { SearchAction, SearchState } from "./types/searchReducer.types";

export const initialState: SearchState = {
  place: "",
  currentRecommendedPlace: recommendedPlacesArray[5],
  hasRecommendedPlaceChanged: false,
};

export const reducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case SearchActions.SET_PLACE:
      return { ...state, place: action.payload };
    case SearchActions.SET_CURRENT_RECOMMENDED_PLACE:
      return {
        ...state,
        currentRecommendedPlace: action.payload,
      };
    case SearchActions.SET_HAS_RECOMMENDED_PLACE_CHANGED:
      return { ...state, hasRecommendedPlaceChanged: action.payload };

    default:
      return state;
  }
};
