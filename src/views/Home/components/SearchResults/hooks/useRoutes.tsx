import { useEffect, useState } from 'react';

import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import { RoutesData } from '../components/SearchResultsListItem/SearchResultsListItem.types';

export const useRoutes = (flight: Flight | undefined) => {
  const [routesData, setRoutesData] = useState<RoutesData | undefined>();

  const [
    {
      searchFormData: { flightType },
    },
  ] = useSearchContext();

  useEffect(() => {
    if (flight) {
      const departRoutes = flight.route.filter((route) => route.return === 0);
      const returnRoutes = flight.route.filter((route) => route.return === 1);
      setRoutesData({ departRoutes, returnRoutes });
    }
  }, [flight, flight?.route, flightType]);

  return routesData;
};
