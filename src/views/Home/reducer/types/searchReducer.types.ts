import { SortBy, SortType } from 'src/enums/sort.enum';

import { SearchFormTypes } from '../../types/types';

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

export interface Sort {
  sortBy: SortBy;
  sortType: SortType;
}

export type SearchState = {
  page: number;
  searchFormData: SearchFormTypes;
  rangeSliderValue: number[];
  sort: Sort;
  directOnly: number | undefined;
  isParamsEqual: boolean;
};
