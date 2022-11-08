import { SearchAction } from "../reducer/types/search.actions.types";
import { SearchState } from "../reducer/types/searchReducer.types";

export type SearchContextValue = [
  state: SearchState,
  dispatch: React.Dispatch<SearchAction>
];
