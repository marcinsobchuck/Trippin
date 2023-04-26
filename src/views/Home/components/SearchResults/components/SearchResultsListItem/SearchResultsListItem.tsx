import React, { useState } from 'react';

import { Icon } from 'src/components/Icon/Icon';
import { Colors } from 'src/enums/colors.enum';
import { useAuth } from 'src/hooks/useAuth';
import { Button } from 'src/styles/Button.styled';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import { useRoutes } from '../../hooks/useRotues';
import { addFavourites, deleteFavourites, formatDate, formatTime } from '../../utils';
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
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(() => favourites.some((el) => el.id === data.id));

  const [
    {
      searchFormData: { flightType },
    },
  ] = useSearchContext();

  const { regionalSettings, currentUser } = useAuth();

  const routes = useRoutes(data);

  const handleItemClick = () => {
    setShowFlightDetailsModal(true);
    setActiveFlight(data);
  };

  const handleAddToFavourites = (e: React.MouseEvent) => {
    e.stopPropagation();
    addFavourites(currentUser, data, regionalSettings.currency.currencyCode);
    setAlreadyLiked(true);
  };

  const handleDeleteFromFavourites = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteFavourites(currentUser, data.id);
    setAlreadyLiked(false);
  };

  if (flightType === 'round') {
    return (
      <ItemWrapper key={data.id} onClick={handleItemClick}>
        <FlightWrapper>
          <FlightDirections>
            <FlightDirectionsWrapper>
              <p>
                {data.cityFrom},{data.flyFrom}
              </p>
              <StyledIcon name="rarrowIcon" width={16} height={16} fill={Colors.DeepDarkBlue} />
              <p>
                {data.cityTo},{data.flyTo}
              </p>
            </FlightDirectionsWrapper>
            <Price>
              {data.price} {regionalSettings.currency.currencyCode}
            </Price>
          </FlightDirections>

          <FlightRoute
            data={data}
            routeType="Departure"
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

          <SectionDivider>
            <span>
              {data.nightsInDest} nights in
              {data.cityTo}
            </span>
          </SectionDivider>

          {routes?.returnRoutes && (
            <FlightRoute
              data={data}
              routeType="Return"
              departDate={formatDate(routes.returnRoutes[0].dTime)}
              departTime={formatTime(routes.returnRoutes[0].dTime)}
              arrivalTime={formatTime(routes?.returnRoutes[routes.returnRoutes.length - 1].aTime)}
              stops={routes.returnRoutes.length - 1}
              routeDirection={routes.returnRoutes[routes.returnRoutes.length - 1].cityTo}
              cityFrom={routes.returnRoutes[0].cityFrom}
              airportCodeFrom={routes?.returnRoutes[0].flyFrom}
              cityTo={routes.returnRoutes[routes.returnRoutes.length - 1].cityTo}
              airportCodeTo={routes.returnRoutes[routes.returnRoutes.length - 1].flyTo}
              flyDuration={data.return_duration}
            />
          )}
        </FlightWrapper>
        <ButtonsWrapper>
          <DetailsButton>
            <i className="fas fa-chevron-down" /> Show details
          </DetailsButton>
          <a href={data.deep_link} target="_blank" rel="noopener noreferrer">
            <Button variant="quaternary" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              See on kiwi.com
            </Button>
          </a>
          <FavouriteWrapper
            onClick={(e) => (alreadyLiked ? handleDeleteFromFavourites(e) : handleAddToFavourites(e))}
          >
            <p>{alreadyLiked ? 'Delete' : 'Save'}</p>
            <Icon name={alreadyLiked ? 'minusIcon' : 'plusIcon'} />
          </FavouriteWrapper>
        </ButtonsWrapper>
      </ItemWrapper>
    );
  }
  if (flightType === 'oneway') {
    return (
      <ItemWrapper key={data.id} onClick={handleItemClick}>
        <FlightWrapper>
          <FlightDirections>
            <FlightDirectionsWrapper>
              <p>
                {data.cityFrom},{data.flyFrom}
              </p>
              <StyledIcon name="rarrowIcon" width={16} height={16} fill={Colors.DeepDarkBlue} />
              <p>
                {data.cityTo},{data.flyTo}
              </p>
            </FlightDirectionsWrapper>
            <Price>
              {data.price} {regionalSettings.currency.currencyCode}
            </Price>
          </FlightDirections>
          <FlightRoute
            data={data}
            routeType="Departure"
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
        </FlightWrapper>
        <ButtonsWrapper>
          <DetailsButton>
            <i className="fas fa-chevron-down" /> Show details
          </DetailsButton>
          <a href={data.deep_link} target="_blank" rel="noopener noreferrer">
            <Button variant="quaternary" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              See on kiwi.com
            </Button>
          </a>
          <FavouriteWrapper
            onClick={(e: React.MouseEvent) =>
              alreadyLiked ? handleDeleteFromFavourites(e) : handleAddToFavourites(e)
            }
          >
            <p>{alreadyLiked ? 'Delete' : 'Save'}</p>
            <Icon name={alreadyLiked ? 'minusIcon' : 'plusIcon'} />
          </FavouriteWrapper>
        </ButtonsWrapper>
      </ItemWrapper>
    );
  }
  return null;
};
