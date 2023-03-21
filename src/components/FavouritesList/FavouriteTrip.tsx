import React from "react";
import { SpringValue } from "react-spring";
import { RedirectButton } from "src/styles/Button.styled";
import { FavouriteFlight } from "../Search/components/SearchResults/hooks/useFavourites";

import {
  formatDate,
  formatTime,
} from "../Search/components/SearchResults/utils";

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
} from "./FavouriteTrip.styled";

interface FavouriteTripProps {
  flight: FavouriteFlight;
  onDelete: (id: string) => void;
  style: {
    transform: SpringValue<string>;
    opacity: SpringValue<number>;
    height: SpringValue<number>;
  };
}

export const FavouriteTrip: React.FC<FavouriteTripProps> = ({
  flight,
  onDelete,
  style,
}) => {
  const {
    countryFrom,
    cityFrom,
    countryTo,
    cityTo,
    price,
    deep_link,
    aTime,
    dTime,
    currency,
    id,
  } = flight;

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
          <FontAwesomeIcon className='fa-solid fa-angles-down' />
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
          <Divider isReturnRoute={true}>
            <FontAwesomeIcon
              isReturnRoute={true}
              className='fa-solid fa-right-left'
            />
          </Divider>

          <RouteContainer>
            <InfoContainer>
              <TextPrimary>
                {countryTo.name}, {returnRoutes[0].cityFrom}
              </TextPrimary>
              <DateText>{formatDate(returnRoutes[0].dTime)}</DateText>
              <DateText>
                {formatTime(returnRoutes[returnRoutes.length - 1].dTime)}
              </DateText>
            </InfoContainer>
            <Divider>
              <FontAwesomeIcon className='fa-solid fa-angles-down' />
            </Divider>
            <InfoContainer>
              <TextPrimary>
                {countryFrom.name},{" "}
                {returnRoutes[returnRoutes.length - 1].cityTo}
              </TextPrimary>
              <DateText>
                {formatDate(returnRoutes[returnRoutes.length - 1].aTime)}
              </DateText>
              <DateText>
                {formatTime(returnRoutes[returnRoutes.length - 1].aTime)}
              </DateText>
            </InfoContainer>
          </RouteContainer>
        </>
      ) : null}
      <Summary>
        <PriceText>
          {price} {currency}
        </PriceText>
        <RedirectButton to={deep_link} variant='quaternary'>
          See on kiwi.com
        </RedirectButton>
      </Summary>
      <ActionsMenu onClick={() => onDelete(id)}>
        <i className='fa-solid fa-trash' />
      </ActionsMenu>
    </TripContainer>
  );
};
