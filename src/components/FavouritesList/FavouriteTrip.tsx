import React from "react";
import { RedirectButton } from "src/styles/Button.styled";
import { FavouriteFlight } from "../Search/components/SearchResults/hooks/useFavourites";

import {
  formatDateToLocalDate,
  formatDateToLocalTime,
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
}

export const FavouriteTrip: React.FC<FavouriteTripProps> = ({
  flight,
  onDelete,
}) => {
  const {
    countryFrom,
    cityFrom,
    countryTo,
    cityTo,
    price,
    deep_link,
    aTimeUTC,
    dTimeUTC,
    currency,
    id,
  } = flight;

  const formatedTimeArrival = formatDateToLocalTime(aTimeUTC);
  const formatedDateArrival = formatDateToLocalDate(aTimeUTC);

  const formatedTimeDeparture = formatDateToLocalTime(dTimeUTC);
  const formatedDateDeparture = formatDateToLocalDate(dTimeUTC);

  const returnRoutes = flight.route.filter((route) => route.return === 1);

  return (
    <TripContainer>
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
              <DateText>
                {formatDateToLocalDate(returnRoutes[0].dTimeUTC)}
              </DateText>
              <DateText>
                {formatDateToLocalTime(
                  returnRoutes[returnRoutes.length - 1].dTimeUTC
                )}
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
                {formatDateToLocalDate(
                  returnRoutes[returnRoutes.length - 1].aTimeUTC
                )}
              </DateText>
              <DateText>
                {formatDateToLocalTime(
                  returnRoutes[returnRoutes.length - 1].aTimeUTC
                )}
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
