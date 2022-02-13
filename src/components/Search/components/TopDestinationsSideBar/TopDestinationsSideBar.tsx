import React, { useEffect, useState } from "react";
import { useTopDestinations } from "src/apiServices/hooks/useTopDestinations";
import { useSearchContext } from "../../hooks/useSearchContext";
import { Wrapper } from "./TopDestinationsSideBar.styled";
import { TopDestinationsSideBarItem } from "./TopDestinationsSideBarItem";

export const TopDestinationsSideBar: React.FC<{
  height?: number;
}> = ({ height }) => {
  const [state] = useSearchContext();

  const { data, refetch, isFetching, isError, isSuccess } = useTopDestinations({
    term: state.searchFormData.start && state.searchFormData.start,
    limit: Math.ceil(state.visibleItems.length * 2.5),
  });

  useEffect(() => {
    if (state.searchFormData.start && state.visibleItems.length > 0) {
      refetch();
    }
  }, [refetch, state.searchFormData.start, state.visibleItems.length]);

  if (isFetching) return <Wrapper>Loading</Wrapper>;

  if (data?.data.locations.length === 0)
    return <Wrapper>No top destinations</Wrapper>;

  if (isError) return <Wrapper>Error retrieving data from the server</Wrapper>;

  return (
    <Wrapper height={height}>
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
