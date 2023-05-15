import { SortBy, SortType } from 'src/enums/sort.enum';

import { SearchActions } from './enums/searchActions.enum';
import { SearchAction } from './types/search.actions.types';
import { SearchState } from './types/searchReducer.types';

export const initialState: SearchState = {
  // Pagination

  page: 1,

  // Form data

  searchFormData: {
    start: {
      id: '',
      text: '',
    },
    destination: {
      id: '',
      text: '',
    },
    date: {
      inbound: '',
      outbound: '',
    },
    flightType: 'round',
    flightSettings: {
      adults: 1,
      children: 0,
      infants: 0,
      cabinCode: 'M',
      cabinClass: 'Economy',
      cabin_key: 'views.home.flightSettings.economy',
    },
  },

  // Sort and filter

  rangeSliderValue: [0, 0],
  sort: {
    sortBy: SortBy.Price,
    sortType: SortType.Ascending,
  },
  directOnly: 0,
  isParamsEqual: false,
};

export const reducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case SearchActions.SET_SEARCH_FORM_DATA:
      return {
        ...state,
        searchFormData: action.payload,
      };

    case SearchActions.SET_PAGE: {
      return {
        ...state,
        page: action.payload,
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

    case SearchActions.SET_DIRECT_ONLY: {
      return {
        ...state,
        directOnly: action.payload,
        rangeSliderValue: [0, 0],
        isParamsEqual: false,
        page: 1,
      };
    }

    case SearchActions.SET_IS_PARAMS_EQUAL: {
      return {
        ...state,
        isParamsEqual: action.payload,
      };
    }

    default:
      return state;
  }
};
