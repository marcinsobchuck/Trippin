import { SortByType, SortTypeType } from '../../../../reducer/types/searchReducer.types';

export interface Option {
  value: {
    sortBy: SortByType;
    sortType: SortTypeType;
  };
  text: string;
}
