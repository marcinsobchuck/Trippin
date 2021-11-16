import { useQuery } from "react-query";
import { getLocations } from "../locationsApi";
import { LocationsParameters } from "../types/locationsApi.types";

export const useLocations = (parameters: LocationsParameters) => {
  const fetchLocations = useQuery("locations", () => getLocations(parameters), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return fetchLocations;
};
