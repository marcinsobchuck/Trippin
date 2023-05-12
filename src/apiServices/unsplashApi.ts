import axios, { AxiosResponse } from 'axios';

import { PhotosParameters, PhotosResponse } from './types/unsplashApi.types';

export const unsplashApi = axios.create({
  baseURL: 'https://api.unsplash.com/',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
    'Accept-Version': 'v1',
  },
});

export const getPhotos = (parameters: PhotosParameters): Promise<AxiosResponse<PhotosResponse>> =>
  unsplashApi.get('/search/photos', {
    params: parameters,
  });
