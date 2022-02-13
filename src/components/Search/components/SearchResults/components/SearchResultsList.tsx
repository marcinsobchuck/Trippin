import React, { MutableRefObject, useEffect, useState, useRef } from "react";
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
import { SearchActions } from "src/components/Search/reducer/enums/searchActions.enum";

export const SearchResultsList: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [activeFlight, setActiveFlight] = useState<Flight>();
  const [showFlightDetailsModal, setShowFlightDetailsModal] =
    useState<boolean>(false);
  const [state, dispatch] = useSearchContext();

  const { searchResults, isLoading, isError } = state;

  const isTabletS = useMediaQuery({
    query: `${Breakpoint.TabletS}`,
  });

  const limit = 8;
  const maxPages = Math.ceil(searchResults.data?.length / limit);

  const offset = page === 1 ? 0 : (page - 1) * limit;

  useEffect(() => {
    if (searchResults.data) {
      dispatch({
        type: SearchActions.SET_VISIBLE_ITEMS,
        payload: searchResults?.data.slice(offset, page * limit),
      });
    }
  }, [dispatch, offset, page, searchResults]);

  if (isLoading)
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

  if (isError) return <div>Error retrieving data from the server!</div>;

  if (searchResults?.data?.length === 0) return <div>Sry no flights</div>;

  return (
    <Wrapper>
      {" "}
      <ListWrapper>
        {state.visibleItems.map((flight: Flight) => (
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
      <PageSetter page={page} maxPages={maxPages} setPage={setPage} />
    </Wrapper>
  );
};
