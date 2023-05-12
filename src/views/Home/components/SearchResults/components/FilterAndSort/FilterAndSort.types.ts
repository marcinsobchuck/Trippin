import { SearchParameters, SortByType, SortTypeType } from 'src/apiServices/types/kiwiApi.types';

export interface Option {
  value: {
    sortBy: SortByType;
    sortType: SortTypeType;
  };
  text_key: string;
}

export interface FilterAndSortProps {
  setShowSortAndFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showSortSortAndFilter: boolean;
  parameters: SearchParameters;
}
