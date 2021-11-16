import { SearchActions } from "./searchActions.enum";
import { SearchAction, SearchState } from "./types/searchReducer.types";

export const initialState: SearchState = {
  result: 1,
  test: "",
};

export const searchReducer = (state: SearchState, action: SearchAction) => {
  switch (action.type) {
    case SearchActions.Increment:
      return {
        result: state.result + action.payload,
        [action.text]: action.payload,
        test: "testx",
      };
    case SearchActions.Decrement:
      return { result: state.result - 1 };
    default:
      return state;
  }
};
