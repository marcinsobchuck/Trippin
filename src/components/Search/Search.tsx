import React, { useReducer, useMemo } from "react";
import { SearchContext } from "./context/search.context";
import { SearchContextValue } from "./context/search.types";
import { initialState, reducer } from "./reducer/search.reducer";

export const Search: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: SearchContextValue = useMemo(() => {
    return [state, dispatch];
  }, [state, dispatch]);

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
