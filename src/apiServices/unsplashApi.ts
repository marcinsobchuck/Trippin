import axios, { AxiosResponse } from "axios";
import { PhotosResponse } from "./types/unsplashApi.types";

export const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
    "Accept-Version": "v1",
  },
});

export const getCollection = () => {
  return unsplashApi.get("/collections/wWFxrA6mSus/photos");
};

export const getPhotos = (
  query: string,
  per_page: number,
  orientation: string
): Promise<AxiosResponse<PhotosResponse>> =>
  unsplashApi.get("/search/photos", {
    params: {
      query,
      per_page,
      orientation,
    },
  });
