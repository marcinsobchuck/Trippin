import React, { useEffect } from 'react';

import { Grid } from 'react-loader-spinner';

import { useTopDestinations } from 'src/apiServices/hooks/useTopDestinations';
import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { Colors } from 'src/enums/colors.enum';

import { useSearchContext } from '../../../../hooks/useSearchContext';
import { TopDestinationsSideBarItem } from '../TopDestinationSidebarItem/TopDestinationsSidebarItem';

import { Heading, HeadingText, Wrapper } from './TopDestinationsSidebar.styled';

interface TopDestinationsSideBarProps {
  visibleItems: Flight[];
}

export const TopDestinationsSideBar: React.FC<TopDestinationsSideBarProps> = ({ visibleItems }) => {
  const [{ searchFormData }] = useSearchContext();

  const { data, refetch, isError, isLoading } = useTopDestinations({
    term: searchFormData.start.id,
    limit: Math.ceil(visibleItems.length * 2.5),
  });

  const topDestinations = data?.data.locations;
  const noTopDestinations = topDestinations?.length === 0;

  // const Arrrrrrrrray = ["Warsaw", "London", "Barcelona"];

  // const queryResults = useQueries(
  //   Arrrrrrrrray.map((topDestination) => {
  //     return {
  //       queryKey: ["top-destination", topDestination],
  //       queryFn: () =>
  //         getPhotos({
  //           orientation: "landscape",
  //           per_page: 1,
  //           query: topDestination,
  //         }),
  //     };
  //   })
  // );

  // console.log(queryResults);

  useEffect(() => {
    if (visibleItems.length > 0) {
      refetch();
    }
  }, [refetch, visibleItems.length]);

  if (isError) return <Wrapper>Error retrieving data from the server</Wrapper>;

  if (noTopDestinations) return <Wrapper>No top destinations</Wrapper>;

  if (isLoading) {
    return (
      <Wrapper>
        <Grid
          wrapperStyle={{
            position: 'absolute',
            top: '120px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          color={Colors.Silver}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Heading>
        <HeadingText>
          Trending destinations from <span>{searchFormData.start.text}</span>
        </HeadingText>
      </Heading>
      <div>
        {topDestinations?.map((topDestination) => (
          <TopDestinationsSideBarItem
            key={topDestination.id}
            id={topDestination.id}
            destinationName={topDestination.name}
            continent={topDestination.continent.name}
            tags={topDestination.tags}
          />
        ))}
      </div>
    </Wrapper>
  );
};
