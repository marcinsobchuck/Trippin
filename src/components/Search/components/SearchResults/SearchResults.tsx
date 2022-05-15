import React, { useState } from "react";
import { useSearchContext } from "../../hooks/useSearchContext";
import { Wrapper } from "./SearchResults.styled";
import { SearchResultsList } from "./components/SearchResultsList";
import { TopDestinationsSideBar } from "../TopDestinationsSideBar/TopDestinationsSideBar";
import { Flight } from "src/apiServices/types/kiwiApi.types";

export const SearchResults: React.FC = () => {
  const [{ isFormSubmitting }] = useSearchContext();

  const [visibleItems, setVisibleItems] = useState<Flight[]>();

  if (!isFormSubmitting) {
    return (
      <Wrapper id='search-results'>
        {visibleItems && <TopDestinationsSideBar visibleItems={visibleItems} />}
        <SearchResultsList
          visibleItems={visibleItems}
          setVisibleItems={setVisibleItems}
        />
      </Wrapper>
    );
  }

  return null;
};
