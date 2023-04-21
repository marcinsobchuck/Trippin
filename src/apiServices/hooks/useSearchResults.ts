import { useQuery } from 'react-query';

import { getSearchResults } from '../kiwiApi';
import { SearchParameters } from '../types/kiwiApi.types';

export const useSearchResults = (parameters: SearchParameters, enabled = false) => {
  const fetchSearchResults = useQuery(
    Object.values(parameters),
    () => getSearchResults(parameters),
    {
      refetchOnWindowFocus: false,
      enabled,
    },
  );
  return fetchSearchResults;
};
