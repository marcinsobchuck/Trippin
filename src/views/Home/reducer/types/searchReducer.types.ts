import { SearchFormTypes } from 'src/shared/types';

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export type CodeType = 'M' | 'W' | 'C' | 'F';

export type CabinClass = 'Economy' | 'Economy premium' | 'Business' | 'First class';

export type SortByType = 'price' | 'duration' | 'quality';

export type SortTypeType = 1 | 0;

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
