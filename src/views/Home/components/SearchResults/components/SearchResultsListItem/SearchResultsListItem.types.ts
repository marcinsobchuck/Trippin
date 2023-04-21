import { Flight, Route } from 'src/apiServices/types/kiwiApi.types';

export interface RoutesData {
  departRoutes: Route[];
  returnRoutes: Route[];
}

export interface SearchResultsListItemProps {
  data: Flight;
  favourites: Flight[];
  setShowFlightDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveFlight: React.Dispatch<React.SetStateAction<Flight | undefined>>;
}
