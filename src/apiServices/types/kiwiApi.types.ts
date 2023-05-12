export type LocationType = 'airport' | 'country' | 'city';

export type LanguageCode = 'en' | 'pl';

export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'PLN';

export type CabinCode = 'M' | 'W' | 'C' | 'F';

export type SortByType = 'price' | 'duration' | 'quality';

export type SortTypeType = 1 | 0;

export interface LocationsParameters {
  term: string;
  location_types: LocationType[];
  limit: number;
  sort: 'name' | '-name';
  locale: string;
}

export interface Location {
  id: string;
  city: {
    id: string;
    code: string;
    continent: {
      id: string;
      name: string;
    };
    name: string;
    country: {
      id: string;
      name: string;
    };
    timezone: string;
  };
  name: string;
  country: {
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
  flight_type: 'round' | 'oneway';
  adults: number;
  children?: number;
  infants?: number;
  selected_cabins: CabinCode;
  curr: CurrencyCode;
  locale: LanguageCode;
  limit: number;
  price_from?: number;
  price_to?: number;
  sort: SortByType;
  asc: SortTypeType;
  max_stopovers?: number;
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
  duration: {
    departure: number;
    return: number;
    total: number;
  };
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
  locale: string;
  limit?: number;
}

export interface Tag {
  tag: 'string';
}

export interface TopDestination {
  id: string;
  name: string;
  slug_en: string;
  code: string;
  tags: Tag[];
  continent: {
    name: string;
  };
}

export interface TopDestinationsResponse {
  locations: TopDestination[];
}
