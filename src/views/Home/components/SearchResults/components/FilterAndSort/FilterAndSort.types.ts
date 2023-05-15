import { SearchParameters } from 'src/apiServices/types/kiwiApi.types';
import { SortBy, SortType } from 'src/enums/sort.enum';

export interface Option {
  value: {
    sortBy: SortBy;
    sortType: SortType;
  };
  text_key: string;
}

export interface FilterAndSortProps {
  setShowSortAndFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showSortSortAndFilter: boolean;
  parameters: SearchParameters;
}
