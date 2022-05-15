import React, { useEffect, useState } from "react";
import { Flight } from "src/apiServices/types/kiwiApi.types";
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
import { FilterAndSort } from "./FilterAndSort";

interface SearchResultsListProps {
  setVisibleItems: (x: Flight[]) => void;
  visibleItems?: Flight[];
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({
  visibleItems,
  setVisibleItems,
}) => {
  const [activeFlight, setActiveFlight] = useState<Flight>();
  const [showFlightDetailsModal, setShowFlightDetailsModal] =
    useState<boolean>(false);
  const [{ page }, dispatch] = useSearchContext();

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const [
    {
      searchFormData: { start, destination, departDate, returnDate },
      flightType,
      passengers: { adults, children: childrenPassengers, infants },
      cabinClass: { code },
    },
  ] = useSearchContext();

  const {
    regionalSettings: {
      currency: { currencyCode },
      language: { languageCode },
    },
  } = useAuth();

  const parameters = {
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
    limit: 100,
  };

  const { refetch, isFetching, isError, data } = useSearchResults(parameters);

  const flightsData = data?.data.data;
  const noFlights = flightsData?.length === 0;

  const limit = 8;
  const maxPages = data ? Math.ceil(data.data.data.length / limit) : 0;
  const offset = page === 1 ? 0 : (page - 1) * limit;

  useEffect(() => {
    refetch();
  }, [refetch, destination, currencyCode, languageCode]);

  useEffect(() => {
    if (flightsData) {
      setVisibleItems(flightsData.slice(offset, page * limit));
    }
  }, [dispatch, flightsData, offset, page, setVisibleItems]);

  if (isError) return <Wrapper>Error retrieving data from the server!</Wrapper>;

  if (noFlights) return <Wrapper>Sry no flights</Wrapper>;

  if (isFetching)
    return (
      <ListWrapper>
        <Oval
          color={Colors.DeepDarkBlue}
          secondaryColor={Colors.LightBlue}
          wrapperStyle={{
            position: "absolute",
            left: "50%",
            top: `${isTabletS ? "480px" : "50%"} `,
            transform: "translate(-50%, -50%)",
          }}
          width={isTabletS ? 320 : 200}
          height={isTabletS ? 320 : 200}
        />
      </ListWrapper>
    );

  return (
    <Wrapper>
      <FilterAndSort setVisibleItems={setVisibleItems} />
      <ListWrapper>
        {visibleItems &&
          visibleItems.map((flight: Flight) => (
            <SearchResultsListItem
              key={flight.id}
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
      <PageSetter maxPages={maxPages} />
    </Wrapper>
  );
};
