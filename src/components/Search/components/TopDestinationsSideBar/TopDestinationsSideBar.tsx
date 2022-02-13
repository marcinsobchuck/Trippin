import React, { useEffect } from "react";
import { useTopDestinations } from "src/apiServices/hooks/useTopDestinations";
import { useSearchContext } from "../../hooks/useSearchContext";
import { Wrapper } from "./TopDestinationsSideBar.styled";
import { TopDestinationsSideBarItem } from "./TopDestinationsSideBarItem";
import { Grid } from "react-loader-spinner";
import { Colors } from "src/enums/colors.enum";

export const TopDestinationsSideBar: React.FC = () => {
  const [state] = useSearchContext();

  const { data, refetch, isError, isSuccess, isFetching } = useTopDestinations({
    term: state.searchFormData.start && state.searchFormData.start,
    limit: Math.ceil(state.visibleItems.length * 2.5),
  });

  useEffect(() => {
    if (state.searchFormData.start && state.visibleItems.length > 0) {
      refetch();
    }
  }, [refetch, state.searchFormData.start, state.visibleItems.length]);

  if (isError) return <Wrapper>Error retrieving data from the server</Wrapper>;

  if (data?.data.locations.length === 0)
    return <Wrapper>No top destinations</Wrapper>;

  if (isFetching)
    return (
      <Wrapper>
        <Grid
          wrapperStyle={{
            position: "absolute",
            top: "120px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          color={Colors.Silver}
        />
      </Wrapper>
    );

  return (
    <Wrapper>
      {data?.data.locations.map((topDestination) => (
        <TopDestinationsSideBarItem
          key={topDestination.id}
          id={topDestination.id}
          destinationName={topDestination.name}
          shouldFetch={isSuccess}
          continent={topDestination.continent.name}
          tags={topDestination.tags}
        />
      ))}
    </Wrapper>
  );
};
