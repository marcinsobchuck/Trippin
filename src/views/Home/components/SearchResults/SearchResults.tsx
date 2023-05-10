import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { useAuth } from 'src/hooks/useAuth';
import { PromiseToastContainer } from 'src/styles/Toast.styled';

import { useSearchContext } from '../../hooks/useSearchContext';

import { FilterAndSort } from './components/FilterAndSort/FilterAndSort';
import { SearchResultsList } from './components/SearchResultsList/SearchResultsList';
import { TopDestinationsSideBar } from './components/TopDestinationsSidebar/TopDestinationsSidebar';
import {
  Heading,
  HeadingText,
  ResultsWrapper,
  TopDestinationsWrapper,
  Wrapper,
} from './SearchResults.styled';

export const SearchResults: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Flight[]>([]);
  const [showSortAndFilter, setShowSortAndFilter] = useState(true);

  const isDesktop = useMediaQuery({
    query: Breakpoint.Desktop,
  });

  const {
    regionalSettings: {
      currency: { currencyCode },
      language: { languageCode },
    },
  } = useAuth();

  const [
    {
      searchFormData: {
        start: { id: startId, text },
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
    return_from: flightType === 'round' ? outbound : undefined,
    return_to: flightType === 'round' ? outbound : undefined,
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

  const { isLoading, isFetching, isSuccess } = useSearchResults(parameters, !!startId);

  const element = document.getElementById('search-results');

  useEffect(() => {
    if (isLoading || isFetching || isSuccess) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [element, isFetching, isLoading, isSuccess]);

  const { t } = useTranslation();

  if (startId) {
    return (
      <Wrapper id="search-results">
        <PromiseToastContainer autoClose={3000} />
        <TopDestinationsWrapper>
          <Heading>
            <HeadingText>{t('views.home.labels.popular')}</HeadingText>
            <span>{text}</span>
          </Heading>
          {isDesktop && <TopDestinationsSideBar visibleItems={visibleItems} />}
        </TopDestinationsWrapper>

        <ResultsWrapper>
          <FilterAndSort
            showSortSortAndFilter={showSortAndFilter}
            setShowSortAndFilter={setShowSortAndFilter}
            parameters={parameters}
          />

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
