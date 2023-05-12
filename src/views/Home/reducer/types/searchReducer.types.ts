import { SortByType, SortTypeType } from 'src/apiServices/types/kiwiApi.types';

import { SearchFormTypes } from '../../types/types';

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export interface Sort {
  sortBy: SortByType;
  sortType: SortTypeType;
}

export type SearchState = {
  page: number;
  searchFormData: SearchFormTypes;
  rangeSliderValue: number[];
  sort: Sort;
  directOnly: number | undefined;
  isParamsEqual: boolean;
};
