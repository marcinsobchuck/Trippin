import {
  CodeType,
  SortByType,
  SortTypeType,
} from "src/components/Search/reducer/types/searchReducer.types";

export type LocationType = "airport" | "country" | "city";

export interface LocationsParameters {
  term: string;
  location_types: LocationType[];
  limit: number;
  sort: "name" | "-name";
  locale: string;
}

export interface Location {
  id: string;
  city?: {
    code: string;
    continent: {
      id: string;
      name: string;
    };
    id: string;
    name: string;
    country: {
      id: string;
      name: string;
    };
    timezone: string;
  };
  name: string;
  country?: {
    id: string;
    name: string;
  };
  type: LocationType;
}

export interface LocationsResponse {
  locations: Location[];
  results_retrieved: number;
}

export interface SearchParameters {
  fly_from: string;
  fly_to: string;
  date_from: string;
  date_to: string;
  return_from?: string;
  return_to?: string;
  flight_type: "round" | "oneway";
  adults: number;
  children?: number;
  infants?: number;
  selected_cabins: CodeType;
  curr: "USD" | "GBP" | "EUR" | "PLN";
  locale: "pl" | "en";
  limit: number;
  price_from?: number;
  price_to?: number;
  sort: SortByType;
  asc: SortTypeType;
  max_stopovers: number | undefined;
}

export interface Route {
  id: string;
  aTime: number;
  dTime: number;
  aTimeUTC: number;
  dTimeUTC: number;
  airline: string;
  cityFrom: string;
  cityTo: string;
  flyFrom: string;
  flyTo: string;
  flight_no: number;
  return?: number;
}

export interface Flight {
  id: string;
  airlines: string[];
  availability: {
    seats: number;
  };
  cityCodeFrom: string;
  cityCodeTo: string;
  cityFrom: string;
  cityTo: string;
  countryFrom: {
    code: string;
    name: string;
  };
  countryTo: {
    code: string;
    name: string;
  };
  aTime: number;
  dTime: number;
  aTimeUTC: number;
  dTimeUTC: number;
  deep_link: string;
  distance: number;
  flyFrom: string;
  flyTo: string;
  fly_duration: string;
  return_duration: string;
  price: number;
  route: Route[];
  nightsInDest: number | null;
  has_airport_change: boolean;
}

export interface SearchResponse {
  data: Flight[];
  search_params: {
    seats: {
      passengers: number;
    };
  };
}

export interface TopDestinationsParameters {
  term: string;
  limit: number;
}

export interface Tag {
  tag: "string";
}

export interface TopDestination {
  id: string;
  name: string;
  code: string;
  tags: Tag[];
  continent: {
    name: string;
  };
}

export interface TopDestinationsResponse {
  locations: TopDestination[];
}
