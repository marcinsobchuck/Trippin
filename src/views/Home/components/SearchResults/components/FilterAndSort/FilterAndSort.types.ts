import { SearchParameters } from 'src/apiServices/types/kiwiApi.types';

import { SortByType, SortTypeType } from '../../../../reducer/types/searchReducer.types';

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
