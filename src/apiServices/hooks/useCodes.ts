import { useQuery } from 'react-query';

import { getCodes } from '../flagsApi';
import { CodesParameters } from '../types/flagsApi.types';

export const useCodes = (language: CodesParameters) => {
  const fetchCodes = useQuery(['flags', language], () => getCodes(language), {
    refetchOnWindowFocus: false,
  });

  return fetchCodes;
};
