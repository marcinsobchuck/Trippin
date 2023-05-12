import { Tag } from 'src/apiServices/types/kiwiApi.types';

export interface TopDestinationsSideBarItemProps {
  destinationName: string;
  continent: string;
  slug: string;
  tags: Tag[];
  id: string;
}
