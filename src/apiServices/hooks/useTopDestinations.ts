import { useQuery } from "react-query";
import { getTopDestinations } from "../kiwiApi";
import { TopDestinationsParameters } from "../types/kiwiApi.types";

export const useTopDestinations = (parameters: TopDestinationsParameters) => {
  const fetchTopDestinations = useQuery(
    ["topDestinations", parameters.term],
    () => getTopDestinations(parameters),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  return fetchTopDestinations;
};
