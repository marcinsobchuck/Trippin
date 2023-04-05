import { SearchFormTypes } from "src/shared/types";

export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
export type CodeType = "M" | "W" | "C" | "F";

export type CabinClass =
  | "Economy"
  | "Economy premium"
  | "Business"
  | "First class";

export interface Cabin {
  code: CodeType;
  text: CabinClass;
}

export type SortByType = "price" | "duration" | "quality";

export type SortTypeType = 1 | 0;

export interface Sort {
  sortBy: SortByType;
  sortType: SortTypeType;
}

export interface Price {
  min: number;
  max: number;
}

export type SearchState = {
  page: number;
  searchFormData: SearchFormTypes;
  price: Price;
  rangeSliderValue: number[];
  sort: Sort;
  directOnly: number | undefined;
  isParamsEqual: boolean;
};
