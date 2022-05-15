import { SearchActions } from "./enums/searchActions.enum";
import { SearchAction, SearchState } from "./types/searchReducer.types";

export const initialState: SearchState = {
  limit: 100,
  isFormSubmitting: true,

  // Pagination

  page: 1,

  // Form data

  searchFormData: {
    start: {
      id: "",
      text: "",
    },
    destination: {
      id: "",
      text: "",
    },
    departDate: "",
    returnDate: "",
  },
  flightType: "round",
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  cabinClass: {
    code: "M",
    text: "Economy",
  },
};

export const reducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
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
    case SearchActions.SET_IS_FORM_SUBMITTING: {
      return {
        ...state,
        isFormSubmitting: action.payload,
      };
    }
    case SearchActions.SET_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    default:
      return state;
  }
};
