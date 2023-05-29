import React from 'react';

import { User } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';

import { Breakpoint } from 'src/enums/breakpoint.enum';
import { Colors } from 'src/enums/colors.enum';
import { Routes } from 'src/enums/routes.enum';
import { useAuth } from 'src/hooks/useAuth';
import { useFavourites } from 'src/hooks/useFavourites';
import { RedirectButton } from 'src/styles/Button.styled';

import { FavouriteTrip } from '../FavouriteTrip/FavouriteTrip';

import { FavouriteTripsContainer, NoResults, NoResultsLink, NoResultsText } from './FavouritesList.styled';
import { useFavouritesTransitions } from './useFavouritesTransitions';

export const FavouritesList: React.FC = () => {
  const { currentUser } = useAuth();
  const { t } = useTranslation();
  const { data, isLoading, deleteFavouriteTrip } = useFavourites(currentUser as User);

  const handleDeleteFavouriteTrip = (id: string) => {
    toast.promise(deleteFavouriteTrip(id), {
      error: t('views.favourites.errors.failedToDelete'),
      pending: t('views.favourites.pending.pendingDeletion'),
      success: t('views.favourites.success.successfulDeletion'),
    });
  };

  const isDesktop = useMediaQuery({
    query: `${Breakpoint.Desktop}`,
  });

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
      <FavouriteTripsContainer data-testid="test-favourites-no-results">
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
