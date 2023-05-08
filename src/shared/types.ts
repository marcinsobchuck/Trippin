export interface RecommendedPlace {
  id: string;
  place_key?: string;
  inputText: string;
  place: string;
  image: string;
}

export type CabinCode = 'M' | 'W' | 'C' | 'F';

export type CabinClass = string;

export type FlightType = 'round' | 'oneway';

export type InputPlaceType = {
  id: string;
  text: string;
};

export type Date = {
  inbound: string;
  outbound?: string;
};

export type FlightSettings = {
  adults: number;
  children: number;
  infants: number;
  cabinCode: CabinCode;
  cabinClass: CabinClass;
  cabin_key: string;
};

export interface SearchFormTypes {
  start: InputPlaceType;
  destination: InputPlaceType;
  date: Date;
  flightType: FlightType;
  flightSettings: FlightSettings;
}
