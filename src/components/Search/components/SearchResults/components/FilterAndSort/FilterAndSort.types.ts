import {
  SortByType,
  SortTypeType,
} from "src/components/Search/reducer/types/searchReducer.types";

export interface Option {
  value: {
    sortBy: SortByType;
    sortType: SortTypeType;
  };
  text: string;
}
