import React, { useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-scroll';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { SortBy, SortType } from 'src/enums/sort.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useFavourites } from 'src/hooks/useFavourites';
import { Button } from 'src/styles/Button.styled';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import { FlightDetailsModal } from '../FlightDetailsModal/FlightDetailsModal';
import { PageSetter } from '../PageSetter/PageSetter';
import { SearchResultsListItem } from '../SearchResultsListItem/SearchResultsListItem';

import {
  ListWrapper,
  NoFlightsText,
  NoFlightsTitle,
  NoFlightsWrapper,
  StickyWrapper,
  Wrapper,
} from './SearchResultsList.styled';
import { SearchResultsListProps } from './SearchResultsList.types';

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  visibleItems,
  setVisibleItems,
  parameters,
}) => {
  const [activeFlight, setActiveFlight] = useState<Flight>();
  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState<boolean>(false);
  const [{ page, sort }] = useSearchContext();

  const { isError, data, isLoading } = useSearchResults(parameters);

  const { currentUser } = useAuth();
  const { data: favourites } = useFavourites(currentUser as User);

  const { t } = useTranslation();

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const flightsData = data?.data.data;
  const noFlights = flightsData?.length === 0;

  const sortFlightsData = (key: SortBy, sortType: SortType) =>
    flightsData?.sort((a, b) => {
      if (key === SortBy.Duration) {
        if (sortType) {
          return a.duration.total - b.duration.total;
        }
        return b.duration.total - a.duration.total;
      }
      if (sortType) {
        return a[key] - b[key];
      }
      return b[key] - a[key];
    });

  const sortedFlightsData = sortFlightsData(sort.sortBy, sort.sortType);

  const limit = 8;
  const maxPages = flightsData ? Math.ceil(flightsData.length / limit) : 0;
  const offset = page === 1 ? 0 : (page - 1) * limit;

  useEffect(() => {
    if (sortedFlightsData) {
      setVisibleItems(sortedFlightsData.slice(offset, page * limit));
    }
  }, [sortedFlightsData, offset, page, setVisibleItems]);

  if (isError) return <Wrapper>Error retrieving data from the server!</Wrapper>;

  if (isLoading) {
    return (
      <StickyWrapper>
        <Oval
          color={Colors.DeepDarkBlue}
          secondaryColor={Colors.LightBlue}
          wrapperStyle={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          width={isTabletS ? 320 : 200}
          height={isTabletS ? 320 : 200}
        />
      </StickyWrapper>
    );
  }

  if (noFlights) {
    return (
      <StickyWrapper>
        <NoFlightsWrapper>
          <NoFlightsTitle>{t('views.home.errors.noFlightsTitle')}</NoFlightsTitle>
          <NoFlightsText>{t('views.home.errors.noFlightsSuggestion')}</NoFlightsText>

          <Link to="search" smooth>
            <Button width={160} variant="quaternary">
              {t('views.home.buttons.search')}
            </Button>
          </Link>
        </NoFlightsWrapper>
      </StickyWrapper>
    );
  }

  return (
    <Wrapper>
      <ListWrapper>
        {visibleItems &&
          visibleItems.map((flight: Flight) => (
            <SearchResultsListItem
              key={flight.id}
              favourites={favourites}
              data={flight}
              setShowFlightDetailsModal={setShowFlightDetailsModal}
              setActiveFlight={setActiveFlight}
            />
          ))}

        {showFlightDetailsModal && (
          <FlightDetailsModal
            setShowFlightDetailsModal={setShowFlightDetailsModal}
            showFlightDetailsModal={showFlightDetailsModal}
            data={activeFlight}
          />
        )}
      </ListWrapper>
      {flightsData && flightsData.length > limit && <PageSetter maxPages={maxPages} />}
    </Wrapper>
  );
};
