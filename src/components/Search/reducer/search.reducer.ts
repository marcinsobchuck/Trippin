import { recommendedPlacesArray } from "../components/SearchDestinationSection/config";
import { SearchActions } from "./enums/searchActions.enum";
import { SearchAction, SearchState } from "./types/searchReducer.types";

export const initialState: SearchState = {
  currentRecommendedPlace: recommendedPlacesArray[5],
  hasRecommendedPlaceChanged: false,
  searchFormData: {
    start: "",
    destination: "",
    depart: "",
    return: "",
  },
  flightType: "round",
  limit: 100,
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  cabinClass: {
    code: "M",
    text: "Economy",
  },
  isLoading: false,
  isError: false,
  showResults: false,
  searchResults: [],
  visibleItems: [],
};

export const reducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
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
    case SearchActions.SET_PASSENGERS:
      return {
        ...state,
        passengers: action.payload,
      };
    case SearchActions.SET_CABIN_CLASS:
      return {
        ...state,
        cabinClass: action.payload,
      };
    case SearchActions.SET_SEARCH_FORM_DATA:
      return {
        ...state,
        searchFormData: action.payload,
      };
    case SearchActions.SET_LIMIT: {
      return {
        ...state,
        limit: action.payload,
      };
    }
    case SearchActions.SET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SearchActions.SET_IS_ERROR: {
      return {
        ...state,
        isError: action.payload,
      };
    }
    case SearchActions.SET_SHOW_RESULTS: {
      return {
        ...state,
        showResults: action.payload,
      };
    }
    case SearchActions.SET_SEARCH_RESULTS: {
      return {
        ...state,
        searchResults: action.payload,
      };
    }
    case SearchActions.SET_VISIBLE_ITEMS: {
      return {
        ...state,
        visibleItems: action.payload,
      };
    }
    default:
      return state;
  }
};
