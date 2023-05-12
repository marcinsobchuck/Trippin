import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { addFavourites, deleteFavourites } from 'src/firebase';
import { useAuth } from 'src/hooks/useAuth';
import { Button } from 'src/styles/Button.styled';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import { useRoutes } from '../../hooks/useRoutes';
import { formatDate, formatTime } from '../../utils';
import { FlightRoute } from '../FlightRoute/FlightRoute';

import {
  ButtonsWrapper,
  DetailsButton,
  FavouriteWrapper,
  FlightDirections,
  FlightDirectionsWrapper,
  FlightWrapper,
  ItemWrapper,
  Price,
  SectionDivider,
  StyledIcon,
} from './SearchResultsListItem.styled';
import { SearchResultsListItemProps } from './SearchResultsListItem.types';

export const SearchResultsListItem: React.FC<SearchResultsListItemProps> = ({
  data,
  setShowFlightDetailsModal,
  setActiveFlight,
  favourites,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(false);

  const [
    {
      searchFormData: { flightType },
    },
  ] = useSearchContext();

  const { regionalSettings, currentUser } = useAuth();

  const { t } = useTranslation();

  const routes = useRoutes(data);

  const handleItemClick = () => {
    setShowFlightDetailsModal(true);
    setActiveFlight(data);
  };

  const handleAddToFavourites = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.promise(addFavourites(currentUser, data, regionalSettings.currency.currencyCode), {
      error: t('views.home.errors.failedToAdd'),
      pending: t('views.home.pending.pendingAddition'),
      success: t('views.home.success.successfulAddition'),
    });

    setAlreadyLiked(true);
  };

  const handleDeleteFromFavourites = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.promise(deleteFavourites(currentUser, data.id), {
      error: t('views.home.errors.failedToDelete'),
      pending: t('views.home.pending.pendingDeletion'),
      success: t('views.home.success.successfulDeletion'),
    });
    setAlreadyLiked(false);
  };

  useEffect(() => {
    if (favourites.some((el) => el.id === data.id)) {
      setAlreadyLiked(true);
    }
  }, [data.id, favourites]);

  return (
    <ItemWrapper key={data.id} onClick={handleItemClick}>
      <FlightWrapper>
        <FlightDirections>
          <FlightDirectionsWrapper>
            <p>{data.cityFrom}</p>
            <StyledIcon name="rarrowIcon" width={16} height={16} fill={Colors.DeepDarkBlue} />
            <p>{data.cityTo}</p>
          </FlightDirectionsWrapper>
          <Price>
            {data.price} {regionalSettings.currency.currencyCode}
          </Price>
        </FlightDirections>

        <FlightRoute
          routeType={t('views.home.flightRoute.departure')}
          departDate={formatDate(data.dTime)}
          departTime={formatTime(data.dTime)}
          arrivalTime={formatTime(data.aTime)}
          stops={routes && routes.departRoutes.length - 1}
          routeDirection={data.cityTo}
          cityFrom={data.cityFrom}
          airportCodeFrom={data.flyFrom}
          cityTo={data.cityTo}
          airportCodeTo={data.flyTo}
          flyDuration={data.fly_duration}
        />

        {routes && routes.returnRoutes.length > 0 && flightType === 'round' && (
          <>
            <SectionDivider>
              <span>
                {data.nightsInDest} {t('views.home.flightRoute.nightsIn')} {data.cityTo}
              </span>
            </SectionDivider>
            <FlightRoute
              routeType={t('views.home.flightRoute.return')}
              departDate={formatDate(routes.returnRoutes[0].dTime)}
              departTime={formatTime(routes.returnRoutes[0].dTime)}
              arrivalTime={formatTime(routes.returnRoutes[routes.returnRoutes.length - 1].aTime)}
              stops={routes.returnRoutes.length - 1}
              routeDirection={routes.returnRoutes[routes.returnRoutes.length - 1].cityTo}
              cityFrom={routes.returnRoutes[0].cityFrom}
              airportCodeFrom={routes.returnRoutes[0].flyFrom}
              cityTo={routes.returnRoutes[routes.returnRoutes.length - 1].cityTo}
              airportCodeTo={routes.returnRoutes[routes.returnRoutes.length - 1].flyTo}
              flyDuration={data.return_duration}
            />
          </>
        )}
      </FlightWrapper>
      <ButtonsWrapper>
        <DetailsButton>
          <i className="fas fa-chevron-down" />
          {t('views.home.flightRoute.showDetails')}
        </DetailsButton>
        <a href={data.deep_link} target="_blank" rel="noopener noreferrer">
          <Button variant="quaternary" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            {t('views.home.buttons.kiwi')}
          </Button>
        </a>
        <FavouriteWrapper
          isAlreadyLiked={alreadyLiked}
          onClick={(e) => (alreadyLiked ? handleDeleteFromFavourites(e) : handleAddToFavourites(e))}
        >
          {currentUser && (
            <>
              <p>{alreadyLiked ? t('views.home.buttons.delete') : t('views.home.buttons.save')}</p>
              <Icon name={alreadyLiked ? 'minusIcon' : 'plusIcon'} fill={Colors.White} />
            </>
          )}
        </FavouriteWrapper>
      </ButtonsWrapper>
    </ItemWrapper>
  );
};
