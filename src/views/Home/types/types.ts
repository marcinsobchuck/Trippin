import { CabinCode } from 'src/apiServices/types/kiwiApi.types';

export interface RecommendedPlace {
  id: string;
  place_key?: string;
  inputText: string;
  place: string;
  image: string;
}

export type InputPlaceType = {
  id: string;
  text: string;
};

export type FlightSettings = {
  adults: number;
  children: number;
  infants: number;
  cabinCode: CabinCode;
  cabin_key: string;
};

export type FlightType = 'round' | 'oneway';

export type Date = {
  inbound: string;
  outbound?: string;
};

export interface SearchFormTypes {
  start: InputPlaceType;
  destination: InputPlaceType;
  date: Date;
  flightType: FlightType;
  flightSettings: FlightSettings;
}
