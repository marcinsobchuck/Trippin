import { Flight, Route } from 'src/apiServices/types/kiwiApi.types';
import { FavouriteFlight } from 'src/hooks/useFavourites';

export interface RoutesData {
  departRoutes: Route[];
  returnRoutes: Route[];
}

export interface SearchResultsListItemProps {
  data: Flight;
  favourites: FavouriteFlight[];
  setShowFlightDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveFlight: React.Dispatch<React.SetStateAction<Flight | undefined>>;
}
