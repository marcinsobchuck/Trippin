import React, { useEffect, useState } from 'react';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';
import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';

import { useSearchContext } from '../../hooks/useSearchContext';

import { FilterAndSort } from './components/FilterAndSort/FilterAndSort';
import { SearchResultsList } from './components/SearchResultsList/SearchResultsList';
import { SortFilterButton } from './components/SearchResultsList/SearchResultsList.styled';
import { TopDestinationsSideBar } from './components/TopDestinationsSidebar/TopDestinationsSidebar';
import { ResultsWrapper, Wrapper } from './SearchResults.styled';

export const SearchResults: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Flight[]>([]);
  const [showSortAndFilter, setShowSortAndFilter] = useState(true);

  const {
    regionalSettings: {
      currency: { currencyCode },
      language: { languageCode },
    },
  } = useAuth();

  const [
    {
      searchFormData: {
        start: { id: startId },
        destination: { id: destinationId },
        date: { inbound, outbound },
        flightType,
        flightSettings: { adults, children, infants, cabinCode },
      },
      rangeSliderValue,
      sort: { sortBy, sortType },
      directOnly,
    },
  ] = useSearchContext();

  const parameters: SearchParameters = {
    fly_from: startId,
    fly_to: destinationId,
    date_from: inbound,
    date_to: inbound,
    return_from: outbound,
    return_to: outbound,
    flight_type: flightType,
    adults,
    children,
    infants,
    selected_cabins: cabinCode,
    curr: currencyCode,
    locale: languageCode,
    limit: 300,
    price_from: rangeSliderValue[0],
    price_to: rangeSliderValue[1],
    sort: sortBy,
    asc: sortType,
    max_stopovers: directOnly,
  };

  const { isLoading } = useSearchResults(parameters, !!startId);

  const element = document.getElementById('search-results');

  useEffect(() => {
    if (isLoading) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [element, isLoading]);

  const handleButtonClick = () => {
    setShowSortAndFilter((prev) => !prev);
  };

  if (startId) {
    return (
      <Wrapper id="search-results">
        <TopDestinationsSideBar visibleItems={visibleItems} />

        <ResultsWrapper>
          {!showSortAndFilter && (
            <SortFilterButton onClick={handleButtonClick}>
              <Icon name="sortFilterIcon" width={18} height={18} fill={Colors.White} />
            </SortFilterButton>
          )}
          {showSortAndFilter && (
            <FilterAndSort setShowSortAndFilter={setShowSortAndFilter} parameters={parameters} />
          )}

          <SearchResultsList
            visibleItems={visibleItems}
            setVisibleItems={setVisibleItems}
            parameters={parameters}
          />
        </ResultsWrapper>
      </Wrapper>
    );
  }
  return null;
};
