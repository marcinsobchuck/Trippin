import React from 'react';

import { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { Routes } from 'src/enums/routes.enum';
import { useAuth } from 'src/hooks/useAuth';
import { RedirectButton } from 'src/styles/Button.styled';
import { useFavourites } from 'src/views/Home/components/SearchResults/hooks/useFavourites';

import { FavouriteTrip } from '../FavouriteTrip/FavouriteTrip';

import { FavouriteTripsContainer, NoResults, NoResultsLink, NoResultsText } from './FavouritesList.styled';
import { useFavouritesTransitions } from './useFavouritesTransitions';

export const FavouritesList: React.FC = () => {
  const { currentUser } = useAuth();

  const { data, isLoading, deleteFavouriteTrip } = useFavourites(currentUser as User);

  const handleDeleteFavouriteTrip = (id: string) => {
    deleteFavouriteTrip(id);
  };

  const isDesktop = useMediaQuery({
    query: `${Breakpoint.Desktop}`,
  });

  const { t } = useTranslation();

  const { transitionsDesktop, transitionsMobile } = useFavouritesTransitions(data);

  const transitions = isDesktop ? transitionsDesktop : transitionsMobile;

  if (isLoading) {
    return (
      <Oval
        color={Colors.DarkBlue}
        secondaryColor={Colors.Blue}
        wrapperStyle={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '90px',
        }}
      />
    );
  }

  if (data.length === 0) {
    return (
      <FavouriteTripsContainer>
        <NoResults>
          <NoResultsText>{t('views.favourites.errors.noUpcomingTrips')}</NoResultsText>
          <NoResultsLink>{t('views.favourites.errors.addNextTrip')}</NoResultsLink>
          <RedirectButton to={Routes.Home} variant="quaternary" width={162}>
            {t('views.favourites.buttons.search')}
          </RedirectButton>
        </NoResults>
      </FavouriteTripsContainer>
    );
  }

  return (
    <FavouriteTripsContainer>
      {transitions((styles, flight) => (
        <FavouriteTrip key={flight.id} flight={flight} onDelete={handleDeleteFavouriteTrip} style={styles} />
      ))}
    </FavouriteTripsContainer>
  );
};
