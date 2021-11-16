import { SearchActions } from "../searchActions.enum";

export interface SearchState {
  result: number;
  test?: string;
}

export interface IncrementAction {
  type: SearchActions.Increment;
  text: string;
  payload: number;
}

export interface DecrementAction {
  type: SearchActions.Decrement;
  payload: number;
}

export type SearchAction = IncrementAction | DecrementAction;
