import { useQuery } from "react-query";
import { getSearchResults } from "../kiwiApi";
import { SearchParameters } from "../types/kiwiApi.types";

export const useSearchResults = (parameters: SearchParameters) => {
  const fetchSearchResults = useQuery(
    "searchResults",
    () => getSearchResults(parameters),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
  return fetchSearchResults;
};
