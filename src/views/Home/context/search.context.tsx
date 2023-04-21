import React, { useMemo, useReducer } from 'react';

import { initialState, reducer } from '../reducer/search.reducer';

import { SearchContextValue } from './search.types';

export const SearchContext = React.createContext<SearchContextValue>({} as SearchContextValue);

export const SearchProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value: SearchContextValue = useMemo(() => [state, dispatch], [state, dispatch]);

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
