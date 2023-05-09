import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from 'src/styles/Button.styled';
import { formatDate, formatTime } from 'src/views/Home/components/SearchResults/utils';

import {
  ActionsMenu,
  DateText,
  Divider,
  FontAwesomeIcon,
  InfoContainer,
  PriceText,
  RouteContainer,
  Summary,
  TextPrimary,
  TripContainer,
} from './FavouriteTrip.styled';
import { FavouriteTripProps } from './FavouriteTrip.types';

export const FavouriteTrip: React.FC<FavouriteTripProps> = ({ flight, onDelete, style }) => {
  const {
    countryFrom,
    cityFrom,
    countryTo,
    cityTo,
    price,
    deep_link: deepLink,
    aTime,
    dTime,
    currency,
    id,
  } = flight;

  const { t } = useTranslation();

  const formatedTimeArrival = formatTime(aTime);
  const formatedDateArrival = formatDate(aTime);

  const formatedTimeDeparture = formatTime(dTime);
  const formatedDateDeparture = formatDate(dTime);

  const returnRoutes = flight.route.filter((route) => route.return === 1);

  return (
    <TripContainer style={style}>
      <RouteContainer>
        <InfoContainer>
          <TextPrimary>
            {countryFrom.name}, {cityFrom}
          </TextPrimary>
          <DateText>{formatedDateDeparture}</DateText>
          <DateText>{formatedTimeDeparture}</DateText>
        </InfoContainer>
        <Divider>
          <FontAwesomeIcon className="fa-solid fa-angles-down" />
        </Divider>
        <InfoContainer>
          <TextPrimary>
            {countryTo.name}, {cityTo}
          </TextPrimary>
          <DateText>{formatedDateArrival}</DateText>
          <DateText>{formatedTimeArrival}</DateText>
        </InfoContainer>
      </RouteContainer>
      {returnRoutes.length > 0 ? (
        <>
          <Divider isReturnRoute>
            <FontAwesomeIcon isReturnRoute className="fa-solid fa-right-left" />
          </Divider>

          <RouteContainer>
            <InfoContainer>
              <TextPrimary>
                {countryTo.name},{returnRoutes[0].cityFrom}
              </TextPrimary>
              <DateText>{formatDate(returnRoutes[0].dTime)}</DateText>
              <DateText>{formatTime(returnRoutes[returnRoutes.length - 1].dTime)}</DateText>
            </InfoContainer>
            <Divider>
              <FontAwesomeIcon className="fa-solid fa-angles-down" />
            </Divider>
            <InfoContainer>
              <TextPrimary>
                {countryFrom.name}, {returnRoutes[returnRoutes.length - 1].cityTo}
              </TextPrimary>
              <DateText>{formatDate(returnRoutes[returnRoutes.length - 1].aTime)}</DateText>
              <DateText>{formatTime(returnRoutes[returnRoutes.length - 1].aTime)}</DateText>
            </InfoContainer>
          </RouteContainer>
        </>
      ) : null}
      <Summary>
        <PriceText>
          {price} {currency}
        </PriceText>
        <a href={deepLink} target="_blank" rel="noopener noreferrer">
          <Button variant="quaternary">{t('views.favourites.buttons.kiwi')}</Button>
        </a>
      </Summary>
      <ActionsMenu onClick={() => onDelete(id)}>
        <i className="fa-solid fa-trash" />
      </ActionsMenu>
    </TripContainer>
  );
};
