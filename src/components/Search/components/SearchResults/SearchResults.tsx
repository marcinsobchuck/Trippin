import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { useSearchContext } from "../../hooks/useSearchContext";
import { Wrapper } from "./SearchResults.styled";
import { SearchResultsList } from "./components/SearchResultsList";
import { TopDestinationsSideBar } from "../TopDestinationsSideBar/TopDestinationsSideBar";

export const SearchResults: React.FC = () => {
  const [height, setHeight] = useState<number>(0);
  const [state] = useSearchContext();
  const { showResults } = state;

  const ref = useRef<HTMLDivElement | null>(null);

  if (showResults) {
    return (
      <Wrapper id='search-results'>
        <TopDestinationsSideBar height={height} />
        <SearchResultsList listRef={ref} />
      </Wrapper>
    );
  }

  return null;
};
