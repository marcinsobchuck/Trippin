import axios, { AxiosResponse } from "axios";
import { PlacesResponse } from "./types/skyscannerApi.types";

export const skyscannerApi = axios.create({
  baseURL:
    "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/",
  headers: {
    "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "x-rapidapi-key": `${process.env.REACT_APP_SKYSCANNER_API_KEY}`,
  },
});

export const getPlaces = (
  query: string
): Promise<AxiosResponse<PlacesResponse>> =>
  skyscannerApi.get("autosuggest/v1.0/US/USD/en-US/", {
    params: {
      query,
    },
  });
