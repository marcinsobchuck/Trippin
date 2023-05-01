import { Dispatch } from 'react';

import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { SearchFormTypes } from 'src/shared/types';

import { SearchActions } from '../enums/searchActions.enum';
import {
  SetDirectOnly,
  SetIsParamsEqual,
  SetPage,
  SetRangeSliderValue,
  SetSearchFormData,
  SetSort,
  SetVisibleItems,
} from '../types/search.actions.types';
import { Sort } from '../types/searchReducer.types';

export const setSearchFormData = (
  dispatch: Dispatch<SetSearchFormData>,
  searchFormData: SearchFormTypes,
) => {
  dispatch({
    type: SearchActions.SET_SEARCH_FORM_DATA,
    payload: searchFormData,
  });
};

export const setVisibleItems = (dispatch: Dispatch<SetVisibleItems>, visibleItems: Flight[]) => {
  dispatch({
    type: SearchActions.SET_VISIBLE_ITEMS,
    payload: visibleItems,
  });
};
export const setPage = (dispatch: Dispatch<SetPage>, page: number) => {
  dispatch({
    type: SearchActions.SET_PAGE,
    payload: page,
  });
};

export const setRangeSliderValue = (
  dispatch: Dispatch<SetRangeSliderValue>,
  rangeSliderValue: number[],
) => {
  dispatch({
    type: SearchActions.SET_RANGE_SLIDER_VALUE,
    payload: rangeSliderValue,
  });
};

export const setSort = (dispatch: Dispatch<SetSort>, sort: Sort) => {
  dispatch({
    type: SearchActions.SET_SORT,
    payload: sort,
  });
};

export const setDirectOnly = (
  dispatch: Dispatch<SetDirectOnly>,
  directOnly: number | undefined,
) => {
  dispatch({
    type: SearchActions.SET_DIRECT_ONLY,
    payload: directOnly,
  });
};

export const setIsParamsEqual = (dispatch: Dispatch<SetIsParamsEqual>, isParamsEqual: boolean) => {
  dispatch({
    type: SearchActions.SET_IS_PARAMS_EQUAL,
    payload: isParamsEqual,
  });
};