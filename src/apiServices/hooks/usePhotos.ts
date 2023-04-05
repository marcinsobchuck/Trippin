import { useQuery } from "react-query";
import { PhotosParameters } from "../types/unsplashApi.types";
import { getPhotos } from "../unsplashApi";

export const usePhotos = (parameters: PhotosParameters) => {
  const fetchPhotos = useQuery(
    ["photo", parameters.query],
    () => getPhotos(parameters),
    {
      refetchOnWindowFocus: false,
    }
  );
  return fetchPhotos;
};
