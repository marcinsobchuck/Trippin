import { SearchActions } from "../enums/searchActions.enum";
import {
  Cabin,
  FlightType,
  Passengers,
  Price,
  SearchFormData,
  Sort,
} from "./searchReducer.types";

export interface SetFlightType {
  type: SearchActions.SET_FLIGHT_TYPE;
  payload: FlightType;
}

export interface SetPassengers {
  type: SearchActions.SET_PASSENGERS;
  payload: Passengers;
}

export interface SetCabinClass {
  type: SearchActions.SET_CABIN_CLASS;
  payload: Cabin;
}

export interface SetSearchFormData {
  type: SearchActions.SET_SEARCH_FORM_DATA;
  payload: SearchFormData;
}

export interface SetShowResults {
  type: SearchActions.SET_SHOW_RESULTS;
  payload: boolean;
}

export interface SetIsFormSubmitting {
  type: SearchActions.SET_IS_FORM_SUBMITTING;
  payload: boolean;
}

export interface SetVisibleItems {
  type: SearchActions.SET_VISIBLE_ITEMS;
  payload: any;
}

export interface SetPage {
  type: SearchActions.SET_PAGE;
  payload: number;
}

export interface SetPrice {
  type: SearchActions.SET_PRICE;
  payload: Price;
}

export interface SetRangeSliderValue {
  type: SearchActions.SET_RANGE_SLIDER_VALUE;
  payload: number[];
}

export interface SetSort {
  type: SearchActions.SET_SORT;
  payload: Sort;
}

export interface SetIsParamsEqual {
  type: SearchActions.SET_IS_PARAMS_EQUAL;
  payload: boolean;
}

export interface SetDirectOnly {
  type: SearchActions.SET_DIRECT_ONLY;
  payload: number | undefined;
}

export type SearchAction =
  | SetFlightType
  | SetCabinClass
  | SetPassengers
  | SetSearchFormData
  | SetIsFormSubmitting
  | SetPage
  | SetPrice
  | SetRangeSliderValue
  | SetSort
  | SetIsParamsEqual
  | SetDirectOnly;
