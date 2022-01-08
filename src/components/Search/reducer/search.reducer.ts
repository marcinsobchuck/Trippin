import { recommendedPlacesArray } from "../components/SearchDestinationSection/config";
import { SearchActions } from "./enums/searchActions.enum";
import { SearchAction, SearchState } from "./types/searchReducer.types";

export const initialState: SearchState = {
  place: "",
  currentRecommendedPlace: recommendedPlacesArray[5],
  hasRecommendedPlaceChanged: false,
  flightType: "round",
  adults: 1,
  children: 0,
  infants: 0,
  cabinClass: {
    code: "M",
    text: "Economy",
  },
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
    case SearchActions.SET_FLIGHT_TYPE:
      return {
        ...state,
        flightType: action.payload,
      };
    case SearchActions.INCREMENT_ADULTS_NUMBER:
      return {
        ...state,
        adults: state.adults + 1,
      };
    case SearchActions.INCREMENT_CHILDREN_NUMBER:
      return {
        ...state,
        children: state.children + 1,
      };
    case SearchActions.INCREMENT_INFANTS_NUMBER:
      return {
        ...state,
        infants: state.infants + 1,
      };
    case SearchActions.DECREMENT_ADULTS_NUMBER:
      return {
        ...state,
        adults: state.adults - 1,
      };
    case SearchActions.DECREMENT_CHILDREN_NUMBER:
      return {
        ...state,
        children: state.children - 1,
      };
    case SearchActions.DECREMENT_INFANTS_NUMBER:
      return {
        ...state,
        infants: state.infants - 1,
      };
    case SearchActions.SET_CABIN_CLASS:
      return {
        ...state,
        cabinClass: action.payload,
      };
    default:
      return state;
  }
};
