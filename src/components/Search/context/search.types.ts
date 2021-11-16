import {
  SearchAction,
  SearchState,
} from "../reducer/types/searchReducer.types";

export type SearchContextValue = [
  state: SearchState,
  dispatch: React.Dispatch<SearchAction>
];
