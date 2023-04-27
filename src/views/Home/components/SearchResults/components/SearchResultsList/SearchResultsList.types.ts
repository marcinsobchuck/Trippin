import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';

export interface SearchResultsListProps {
  setVisibleItems: (x: Flight[]) => void;
  visibleItems?: Flight[];
  parameters: SearchParameters;
}
