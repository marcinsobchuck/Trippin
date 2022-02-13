import { useQuery } from "react-query";
import { getLocations } from "../kiwiApi";
import { LocationsParameters } from "../types/kiwiApi.types";

export const useLocations = (parameters: LocationsParameters) => {
  const fetchLocations = useQuery("locations", () => getLocations(parameters), {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  return fetchLocations;
};
