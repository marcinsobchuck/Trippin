import { SearchActions } from "./enums/searchActions.enum";
import { SearchAction } from "./types/search.actions.types";
import { SearchState } from "./types/searchReducer.types";

export const initialState: SearchState = {
  isFormSubmitting: true,
  isParamsEqual: false,
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

  // Sort and filter

  price: {
    min: 0,
    max: 0,
  },
  rangeSliderValue: [0, 0],
  sort: {
    sortBy: "price",
    sortType: 1,
  },
  directOnly: 0,
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
    case SearchActions.SET_PRICE: {
      return {
        ...state,
        price: action.payload,
      };
    }
    case SearchActions.SET_RANGE_SLIDER_VALUE: {
      return {
        ...state,
        rangeSliderValue: action.payload,
        page: 1,
      };
    }
    case SearchActions.SET_SORT: {
      return {
        ...state,
        sort: action.payload,
        page: 1,
      };
    }
    case SearchActions.SET_IS_PARAMS_EQUAL: {
      return {
        ...state,
        isParamsEqual: action.payload,
      };
    }
    case SearchActions.SET_DIRECT_ONLY: {
      return {
        ...state,
        directOnly: action.payload,
        rangeSliderValue: [0, 0],
        isParamsEqual: false,
      };
    }

    default:
      return state;
  }
};
