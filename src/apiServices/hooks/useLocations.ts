import { useQuery } from 'react-query';

import { getLocations } from '../kiwiApi';
import { LocationsParameters } from '../types/kiwiApi.types';

export const useLocations = (parameters: LocationsParameters) => {
  const fetchLocations = useQuery(['location', parameters.term], () => getLocations(parameters), {
    refetchOnWindowFocus: false,
    enabled: parameters.term.trim() !== '',
  });

  return fetchLocations;
};
