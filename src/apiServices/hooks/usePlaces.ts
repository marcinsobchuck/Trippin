import { useQuery } from "react-query";
import { getPlaces } from "../skyscannerApi";

export const usePlaces = (query: string) => {
  const fetchPlaces = useQuery("places", () => getPlaces(query), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return fetchPlaces;
};
