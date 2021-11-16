import React from "react";
import { SearchContextValue } from "./search.types";

export const SearchContext = React.createContext<SearchContextValue>(
  {} as SearchContextValue
);
