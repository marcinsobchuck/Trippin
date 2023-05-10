import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';

export interface TopDestinationsSideBarProps {
  visibleItems: Flight[];
  parameters: SearchParameters;
}
