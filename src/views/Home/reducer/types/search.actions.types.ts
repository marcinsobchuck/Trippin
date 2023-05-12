import { Flight } from 'src/apiServices/types/kiwiApi.types';

import { SearchFormTypes } from '../../types/types';
import { SearchActions } from '../enums/searchActions.enum';

import { Sort } from './searchReducer.types';

export interface SetSearchFormData {
  type: SearchActions.SET_SEARCH_FORM_DATA;
  payload: SearchFormTypes;
}

export interface SetVisibleItems {
  type: SearchActions.SET_VISIBLE_ITEMS;
  payload: Flight[];
}

export interface SetPage {
  type: SearchActions.SET_PAGE;
  payload: number;
}

export interface SetRangeSliderValue {
  type: SearchActions.SET_RANGE_SLIDER_VALUE;
  payload: number[];
}

export interface SetSort {
  type: SearchActions.SET_SORT;
  payload: Sort;
}

export interface SetDirectOnly {
  type: SearchActions.SET_DIRECT_ONLY;
  payload: number | undefined;
}

export interface SetIsParamsEqual {
  type: SearchActions.SET_IS_PARAMS_EQUAL;
  payload: boolean;
}

export type SearchAction =
  | SetSearchFormData
  | SetPage
  | SetRangeSliderValue
  | SetSort
  | SetDirectOnly
  | SetIsParamsEqual;
