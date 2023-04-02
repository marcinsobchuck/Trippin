import React, { useEffect, useState } from "react";
import { Flight, SearchParameters } from "src/apiServices/types/kiwiApi.types";
import { useSearchContext } from "src/components/Search/hooks/useSearchContext";
import { ListWrapper, Wrapper } from "./SearchResultsList.styled";
import { SearchResultsListItem } from "./SearchResultsListItem";
import { Colors } from "src/enums/colors.enum";
import { Oval } from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import { Breakpoint } from "src/enums/breakpoint.enum";
import { FlightDetailsModal } from "./FlightDetailsModal";
import { PageSetter } from "./PageSetter";
import { useSearchResults } from "src/apiServices/hooks/useSearchResults";
import { useAuth } from "src/hooks/useAuth";
import { useFavourites } from "../hooks/useFavourites";

interface SearchResultsListProps {
  setVisibleItems: (x: Flight[]) => void;
  visibleItems?: Flight[];
  setFlightsData: (x: Flight[]) => void;
  parameters: SearchParameters;
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  visibleItems,
  setVisibleItems,
  setFlightsData,
  parameters,
}) => {
  const [activeFlight, setActiveFlight] = useState<Flight>();
  const [showFlightDetailsModal, setShowFlightDetailsModal] =
    useState<boolean>(false);

  const { isFetching, isError, data, isLoading } = useSearchResults(parameters);
  const [{ page }, dispatch] = useSearchContext();
  const { currentUser } = useAuth();
  const { data: favourites } = useFavourites(currentUser);

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
      setFlightsData(flightsData);
    }
  }, [dispatch, flightsData, offset, page, setFlightsData, setVisibleItems]);

  if (isError) return <Wrapper>Error retrieving data from the server!</Wrapper>;

  if (isLoading)
    return (
      <Wrapper>
        <Oval
          color={Colors.DeepDarkBlue}
          secondaryColor={Colors.LightBlue}
          wrapperStyle={{
            position: "absolute",
            left: "50vw",
            top: "50vh",
            transform: "translate(-25vw, -25vh)",
          }}
          width={isTabletS ? 320 : 200}
          height={isTabletS ? 320 : 200}
        />
      </Wrapper>
    );

  if (noFlights)
    return (
      <Wrapper>
        <p>Sry no flights</p>
      </Wrapper>
    );

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
      {flightsData && flightsData.length > limit && (
        <PageSetter maxPages={maxPages} />
      )}
    </Wrapper>
  );
};
