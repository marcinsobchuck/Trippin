import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';

export interface SearchResultsListProps {
  visibleItems?: Flight[];
  parameters: SearchParameters;
}
