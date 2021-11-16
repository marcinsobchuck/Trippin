import axios, { AxiosResponse } from "axios";
import {
  LocationsParameters,
  LocationsResponse,
} from "./types/locationsApi.types";
import qs from "qs";

export const locationsApi = axios.create({
  baseURL: "https://tequila-api.kiwi.com",
  headers: {
    accept: "application/json",
    apikey: "89dWahS0WDFGsrzpH9LQaDRDIKzfAnyR",
  },
});

export const getLocations = (
  parameters: LocationsParameters
): Promise<AxiosResponse<LocationsResponse>> =>
  locationsApi.get("/locations/query", {
    params: parameters,
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });
