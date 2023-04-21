import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

import {
  LocationsParameters,
  LocationsResponse,
  SearchParameters,
  SearchResponse,
  TopDestinationsParameters,
  TopDestinationsResponse,
} from './types/kiwiApi.types';

export const kiwiApi = axios.create({
  baseURL: 'https://tequila-api.kiwi.com',
  headers: {
    accept: 'application/json',
    apikey: `${process.env.REACT_APP_KIWI_API_KEY}`,
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

export const getLocations = (
  parameters: LocationsParameters,
): Promise<AxiosResponse<LocationsResponse>> =>
  kiwiApi.get('/locations/query', {
    params: parameters,
  });

export const getSearchResults = (
  parameters: SearchParameters,
): Promise<AxiosResponse<SearchResponse>> =>
  kiwiApi.get('/search/', {
    params: parameters,
  });

export const getTopDestinations = (
  parameters: TopDestinationsParameters,
): Promise<AxiosResponse<TopDestinationsResponse>> =>
  kiwiApi.get('/locations/topdestinations', {
    params: parameters,
  });
