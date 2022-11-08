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

export type FlightType = "round" | "oneway";

export interface Price {
  min: number;
  max: number;
}

export interface SearchFormData {
  start: {
    id: string;
    text: string;
  };
  destination: {
    id: string;
    text: string;
  };
  departDate: string;
  returnDate?: string;
}

export type SearchState = {
  page: number;
  flightType: FlightType;
  passengers: Passengers;
  cabinClass: Cabin;
  isFormSubmitting: boolean;
  isParamsEqual: boolean;
  searchFormData: SearchFormData;
  price: Price;
  rangeSliderValue: number[];
  sort: Sort;
  directOnly: number | undefined;
};
