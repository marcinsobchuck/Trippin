import React, { useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { Oval } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';
import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import { useFavourites } from '../../hooks/useFavourites';
import { FlightDetailsModal } from '../FlightDetailsModal/FlightDetailsModal';
import { PageSetter } from '../PageSetter/PageSetter';
import { SearchResultsListItem } from '../SearchResultsListItem/SearchResultsListItem';

import { ListWrapper, Wrapper } from './SearchResultsList.styled';

interface SearchResultsListProps {
  setVisibleItems: (x: Flight[]) => void;
  visibleItems?: Flight[];
  parameters: SearchParameters;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  visibleItems,
  setVisibleItems,
  parameters,
}) => {
  const [activeFlight, setActiveFlight] = useState<Flight>();
  const [showFlightDetailsModal, setShowFlightDetailsModal] = useState<boolean>(false);
  const [{ page }, dispatch] = useSearchContext();

  const { isError, data, isLoading } = useSearchResults(parameters);

  const { currentUser } = useAuth();
  const { data: favourites } = useFavourites(currentUser as User);

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const flightsData = data?.data.data;
  const noFlights = flightsData?.length === 0;

  const limit = 8;
  const maxPages = data ? Math.ceil(data.data.data.length / limit) : 0;
  const offset = page === 1 ? 0 : (page - 1) * limit;

  useEffect(() => {
    if (flightsData) {
      setVisibleItems(flightsData.slice(offset, page * limit));
    }
  }, [dispatch, flightsData, offset, page, setVisibleItems]);

  if (isError) return <Wrapper>Error retrieving data from the server!</Wrapper>;

  if (isLoading) {
    return (
      <Wrapper>
        <Oval
          color={Colors.DeepDarkBlue}
          secondaryColor={Colors.LightBlue}
          wrapperStyle={{
            position: 'absolute',
            left: '50vw',
            top: '50vh',
            transform: 'translate(-25vw, -25vh)',
          }}
          width={isTabletS ? 320 : 200}
          height={isTabletS ? 320 : 200}
        />
      </Wrapper>
    );
  }

  if (noFlights) {
    return (
      <Wrapper>
        <p>Sry no flights</p>
      </Wrapper>
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
