import { Locations } from 'src/enums/locations.enum';
import { SortBy, SortType } from 'src/enums/sort.enum';

export type LanguageCode = 'en' | 'pl';

export type CurrencyCode = 'USD' | 'GBP' | 'EUR' | 'PLN';

export type CabinCode = 'M' | 'W' | 'C' | 'F';

export interface LocationsParameters {
  term: string;
  location_types: Locations[];
  limit: number;
  sort: 'name' | '-name';
  locale: string;
}

export type Location = Airport | City | Country;

export interface Airport {
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
  type: Locations.Airport;
}
export interface Country {
  id: string;
  name: string;
  type: Locations.Country;
}
export interface City {
  id: string;
  name: string;
  country: {
    id: string;
    name: string;
  };
  type: Locations.City;
}

export interface LocationsResponse {
  locations: Location[];
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
  sort: SortBy;
  asc: SortType;
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
  quality: number;
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
