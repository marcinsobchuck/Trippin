import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSearchContext } from "src/components/Search/hooks/useSearchContext";
import { SearchActions } from "src/components/Search/reducer/enums/searchActions.enum";
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

  const [, dispatch] = useSearchContext();

  const { isFetching, isSuccess, isError, data } = fetchSearchResults;

  useEffect(() => {
    isError && dispatch({ type: SearchActions.SET_IS_ERROR, payload: true });
    dispatch({ type: SearchActions.SET_IS_LOADING, payload: false });
  }, [dispatch, isError]);

  useEffect(() => {
    isFetching &&
      dispatch({ type: SearchActions.SET_IS_LOADING, payload: true });
  }, [dispatch, isFetching]);

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: SearchActions.SET_SEARCH_RESULTS, payload: data?.data });
      dispatch({ type: SearchActions.SET_IS_LOADING, payload: false });
      dispatch({ type: SearchActions.SET_IS_ERROR, payload: false });
    }
  }, [data?.data, dispatch, isSuccess]);

  return fetchSearchResults;
};
