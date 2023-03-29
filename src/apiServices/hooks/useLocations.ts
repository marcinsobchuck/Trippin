import { useQuery } from "react-query";
import { getLocations } from "../kiwiApi";
import { LocationsParameters } from "../types/kiwiApi.types";

export const useLocations = (parameters: LocationsParameters) => {
  const fetchLocations = useQuery(
    parameters.term,
    () => getLocations(parameters),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return fetchLocations;
};
