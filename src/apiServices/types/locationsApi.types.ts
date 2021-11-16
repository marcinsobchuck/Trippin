export type LocationType = "airport" | "country" | "city";

export interface LocationsParameters {
  term: string;
  location_types: LocationType[];
  limit: number;
  sort: "name" | "-name";
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
