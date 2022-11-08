import { Dispatch } from "react";

import { SearchActions } from "../enums/searchActions.enum";
import {
  SetCabinClass,
  SetDirectOnly,
  SetFlightType,
  SetIsFormSubmitting,
  SetIsParamsEqual,
  SetPage,
  SetPassengers,
  SetPrice,
  SetRangeSliderValue,
  SetSearchFormData,
  SetShowResults,
  SetSort,
  SetVisibleItems,
} from "../types/search.actions.types";
import {
  Cabin,
  FlightType,
  Passengers,
  Price,
  SearchFormData,
  Sort,
} from "../types/searchReducer.types";

export const setFlightType = (
  dispatch: Dispatch<SetFlightType>,
  flightType: FlightType
) => {
  dispatch({ type: SearchActions.SET_FLIGHT_TYPE, payload: flightType });
};

export const setPassengers = (
  dispatch: Dispatch<SetPassengers>,
  passengers: Passengers
) => {
  dispatch({ type: SearchActions.SET_PASSENGERS, payload: passengers });
};

export const setCabinClass = (
  dispatch: Dispatch<SetCabinClass>,
  cabin: Cabin
) => {
  dispatch({ type: SearchActions.SET_CABIN_CLASS, payload: cabin });
};

export const setSearchFormData = (
  dispatch: Dispatch<SetSearchFormData>,
  searchFormData: SearchFormData
) => {
  dispatch({
    type: SearchActions.SET_SEARCH_FORM_DATA,
    payload: searchFormData,
  });
};

export const setShowResults = (
  dispatch: Dispatch<SetShowResults>,
  showResults: boolean
) => {
  dispatch({
    type: SearchActions.SET_SHOW_RESULTS,
    payload: showResults,
  });
};

export const setIsFormSubmitting = (
  dispatch: Dispatch<SetIsFormSubmitting>,
  isFormSubmitting: boolean
) => {
  dispatch({
    type: SearchActions.SET_IS_FORM_SUBMITTING,
    payload: isFormSubmitting,
  });
};
export const setVisibleItems = (
  dispatch: Dispatch<SetVisibleItems>,
  visibleItems: any
) => {
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
export const setPrice = (dispatch: Dispatch<SetPrice>, price: Price) => {
  dispatch({
    type: SearchActions.SET_PRICE,
    payload: price,
  });
};

export const setRangeSliderValue = (
  dispatch: Dispatch<SetRangeSliderValue>,
  rangeSliderValue: number[]
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

export const setIsParamsEqual = (
  dispatch: Dispatch<SetIsParamsEqual>,
  isParamsEqual: boolean
) => {
  dispatch({
    type: SearchActions.SET_IS_PARAMS_EQUAL,
    payload: isParamsEqual,
  });
};

export const setDirectOnly = (
  dispatch: Dispatch<SetDirectOnly>,
  directOnly: number | undefined
) => {
  dispatch({
    type: SearchActions.SET_DIRECT_ONLY,
    payload: directOnly,
  });
};
