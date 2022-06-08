import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchContext } from "../../hooks/useSearchContext";
import { ResultsWrapper, Wrapper } from "./SearchResults.styled";
import { SearchResultsList } from "./components/SearchResultsList";
import { TopDestinationsSideBar } from "../TopDestinationsSideBar/TopDestinationsSideBar";
import { Flight, SearchParameters } from "src/apiServices/types/kiwiApi.types";
import { FilterAndSort } from "./components/FilterAndSort/FilterAndSort";
import {
  SortFilterButton,
  SortFilterIcon,
} from "./components/SearchResultsList.styled";
import { useAuth } from "src/hooks/useAuth";

import sortfilter from "src/assets/images/sortfilter.svg";
import { useSearchResults } from "src/apiServices/hooks/useSearchResults";
import isEqual from "lodash.isequal";

export const SearchResults: React.FC = () => {
  const [{ isFormSubmitting }, dispatch] = useSearchContext();

  const [visibleItems, setVisibleItems] = useState<Flight[]>();
  const [flightsData, setFlightsData] = useState<Flight[]>();
  const [showSortAndFilter, setShowSortAndFilter] = useState<boolean>(true);
  const element = document.getElementById("search-results");

  const {
    regionalSettings: {
      currency: { currencyCode },
      language: { languageCode },
    },
  } = useAuth();

  const [
    {
      searchFormData: { start, destination, departDate, returnDate },
      flightType,
      passengers: { adults, children: childrenPassengers, infants },
      cabinClass: { code },
      price: { min, max },
      rangeSliderValue,
      sort: { sortBy, sortType },
      directOnly,
    },
  ] = useSearchContext();
  const parameters: SearchParameters = useMemo(
    () => ({
      fly_from: start.id,
      fly_to: destination.id,
      date_from: departDate,
      date_to: departDate,
      return_from: returnDate,
      return_to: returnDate,
      flight_type: flightType,
      adults,
      children: childrenPassengers,
      infants,
      selected_cabins: code,
      curr: currencyCode,
      locale: languageCode,
      limit: 300,
      price_from: rangeSliderValue[0],
      price_to: rangeSliderValue[1],
      sort: sortBy,
      asc: sortType,
      max_stopovers: directOnly,
    }),
    [
      adults,
      childrenPassengers,
      code,
      currencyCode,
      departDate,
      destination.id,
      flightType,
      infants,
      languageCode,
      rangeSliderValue,
      returnDate,
      sortBy,
      sortType,
      start.id,
      directOnly,
    ]
  );
  const [params, setParams] = useState<SearchParameters>(parameters);

  const prevParameters = useRef<SearchParameters>();

  const { refetch } = useSearchResults(parameters);

  const paramsNotEqual = !isEqual(prevParameters.current, params);

  useEffect(() => {
    prevParameters.current = params;
  }, [params]);

  useEffect(() => {
    if (!isFormSubmitting) {
      refetch();
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [
    refetch,
    destination,
    currencyCode,
    languageCode,
    rangeSliderValue,
    sortType,
    sortBy,
    element,
    parameters,
    directOnly,
    isFormSubmitting,
  ]);

  const handleButtonClick = () => {
    setShowSortAndFilter((prev) => !prev);
  };

  if (!isFormSubmitting) {
    return (
      <Wrapper id='search-results'>
        {visibleItems && <TopDestinationsSideBar visibleItems={visibleItems} />}

        <ResultsWrapper>
          {!showSortAndFilter && (
            <SortFilterButton onClick={handleButtonClick}>
              <SortFilterIcon src={sortfilter} />
            </SortFilterButton>
          )}
          {flightsData && showSortAndFilter && (
            <FilterAndSort
              flightsData={flightsData}
              setShowSortAndFilter={setShowSortAndFilter}
              paramsNotEqual={paramsNotEqual}
              parameters={parameters}
            />
          )}

          <SearchResultsList
            visibleItems={visibleItems}
            setVisibleItems={setVisibleItems}
            setFlightsData={setFlightsData}
            parameters={parameters}
          />
        </ResultsWrapper>
      </Wrapper>
    );
  }

  return null;
};
