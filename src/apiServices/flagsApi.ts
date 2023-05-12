import axios, { AxiosResponse } from 'axios';

import { CodesParameters, FlagsResponse } from './types/flagsApi.types';

export const flagsApi = axios.create({
  baseURL: 'https://flagcdn.com/',
});

export const getCodes = (language: CodesParameters): Promise<AxiosResponse<FlagsResponse>> =>
  flagsApi.get(`${language}/codes.json`);
