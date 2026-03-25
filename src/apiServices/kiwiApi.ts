import axios, { AxiosResponse } from "axios";
import qs from "qs";

import {
  LocationsParameters,
  LocationsResponse,
  SearchParameters,
  SearchResponse,
  TopDestinationsParameters,
  TopDestinationsResponse,
} from "./types/kiwiApi.types";

const baseURL = process.env.VERCEL_URL || "";

export const kiwiApi = axios.create({
  baseURL,
  headers: {
    accept: "application/json",
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export const getLocations = (
  parameters: LocationsParameters,
): Promise<AxiosResponse<LocationsResponse>> =>
  kiwiApi.get("/api/locations", {
    params: parameters,
  });

export const getSearchResults = (
  parameters: SearchParameters,
): Promise<AxiosResponse<SearchResponse>> =>
  kiwiApi.get("/api/search", {
    params: parameters,
  });

export const getTopDestinations = (
  parameters: TopDestinationsParameters,
): Promise<AxiosResponse<TopDestinationsResponse>> =>
  kiwiApi.get("/api/topdestinations", {
    params: parameters,
  });
