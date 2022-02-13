import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { useSearchContext } from "../../hooks/useSearchContext";
import { Wrapper } from "./SearchResults.styled";
import { SearchResultsList } from "./components/SearchResultsList";
import { TopDestinationsSideBar } from "../TopDestinationsSideBar/TopDestinationsSideBar";

export const SearchResults: React.FC = () => {
  const [state] = useSearchContext();
  const { showResults } = state;

  if (showResults) {
    return (
      <Wrapper id='search-results'>
        <TopDestinationsSideBar />
        <SearchResultsList />
      </Wrapper>
    );
  }

  return null;
};
