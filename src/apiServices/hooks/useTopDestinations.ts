import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { getTopDestinations } from '../kiwiApi';
import { SearchResponse, TopDestinationsParameters } from '../types/kiwiApi.types';

export const useTopDestinations = (
  parameters: TopDestinationsParameters,
  data?: AxiosResponse<SearchResponse>,
) => {
  const fetchTopDestinations = useQuery(
    ['topDestinations', parameters.term, parameters.locale],
    () => getTopDestinations(parameters),
    {
      refetchOnWindowFocus: false,
      enabled: !!parameters.limit && !!data,
    },
  );

  return fetchTopDestinations;
};
