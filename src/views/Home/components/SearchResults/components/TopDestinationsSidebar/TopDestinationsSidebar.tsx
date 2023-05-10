import React, { useEffect } from 'react';

import { LazyLoadComponent } from 'react-lazy-load-image-component';
import { Grid } from 'react-loader-spinner';

import { useTopDestinations } from 'src/apiServices/hooks/useTopDestinations';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import { convertLanguageCodes } from '../../../SearchDestinationSection/components/SearchFormInput/utils';
import { StickyWrapper } from '../SearchResultsList/SearchResultsList.styled';
import { TopDestinationsSideBarItem } from '../TopDestinationSidebarItem/TopDestinationsSidebarItem';

import { Wrapper } from './TopDestinationsSidebar.styled';
import { TopDestinationsSideBarProps } from './TopDestinationsSidebar.types';

export const TopDestinationsSideBar: React.FC<TopDestinationsSideBarProps> = ({ visibleItems }) => {
  const [{ searchFormData }] = useSearchContext();

  const {
    regionalSettings: {
      language: { languageCode },
    },
  } = useAuth();

  const { data, refetch, isError, isLoading } = useTopDestinations({
    term: searchFormData.start.id,
    limit: visibleItems.length > 0 ? Math.ceil(visibleItems.length * 2.5) : 20,
    locale: convertLanguageCodes(languageCode),
  });

  const topDestinations = data?.data.locations;
  const noTopDestinations = topDestinations?.length === 0;

  useEffect(() => {
    if (visibleItems.length > 0) {
      refetch();
    }
  }, [refetch, visibleItems.length]);

  if (isError) return <Wrapper>Error retrieving data from the server</Wrapper>;

  if (noTopDestinations) return <Wrapper>No top destinations</Wrapper>;

  if (isLoading) {
    return (
      <StickyWrapper>
        <Grid
          wrapperStyle={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          color={Colors.Silver}
        />
      </StickyWrapper>
    );
  }

  return (
    <Wrapper>
      {topDestinations?.map((topDestination) => (
        <LazyLoadComponent key={topDestination.id}>
          <TopDestinationsSideBarItem
            id={topDestination.id}
            destinationName={topDestination.name}
            continent={topDestination.continent.name}
            tags={topDestination.tags}
          />
        </LazyLoadComponent>
      ))}
    </Wrapper>
  );
};
