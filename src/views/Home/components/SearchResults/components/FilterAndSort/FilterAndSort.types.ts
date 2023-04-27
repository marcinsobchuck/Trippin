import { SearchParameters } from 'src/apiServices/types/kiwiApi.types';

import { SortByType, SortTypeType } from '../../../../reducer/types/searchReducer.types';

export interface Option {
  value: {
    sortBy: SortByType;
    sortType: SortTypeType;
  };
  text: string;
}

export interface FilterAndSortProps {
  setShowSortAndFilter: (x: boolean) => void;
  parameters: SearchParameters;
}
