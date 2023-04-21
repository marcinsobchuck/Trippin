import axios, { AxiosResponse } from 'axios';

interface FlagsResponse {
  [key: string]: string;
}

export const flagsApi = axios.create({
  baseURL: 'https://flagcdn.com/',
});

export const getCodes = (language: 'pl' | 'en'): Promise<AxiosResponse<FlagsResponse>> =>
  flagsApi.get(`${language}/codes.json`);
