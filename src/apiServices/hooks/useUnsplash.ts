import { useQuery } from "react-query";
import { getPhotos } from "../unsplashApi";

export const useUnsplash = (
  query: string,
  per_page: number,
  orientation: string
) => {
  const fetchPhotos = useQuery(
    "photos",
    () => getPhotos(query, per_page, orientation),
    {
      refetchOnWindowFocus: false,
    }
  );
  return fetchPhotos;
};
