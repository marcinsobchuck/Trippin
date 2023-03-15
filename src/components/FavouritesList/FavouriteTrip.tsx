import React from "react";
import { Flight } from "src/apiServices/types/kiwiApi.types";
import { useRoutes } from "../Search/components/SearchResults/hooks/useRotues";
import {
  formatDateToLocalDate,
  formatDateToLocalTime,
} from "../Search/components/SearchResults/utils";
import { useSearchContext } from "../Search/hooks/useSearchContext";

import {
  DateText,
  Divider,
  FontAwesomeIcon,
  InfoContainer,
  RouteContainer,
  TextPrimary,
  TripContainer,
} from "./FavouriteTrip.styled";

interface FavouriteTripProps {
  flight: Flight;
}

export const FavouriteTrip: React.FC<FavouriteTripProps> = ({ flight }) => {
  const {
    countryFrom,
    cityFrom,
    countryTo,
    cityTo,
    price,
    deep_link,
    aTimeUTC,
    dTimeUTC,
    duration: { return: returnDuration },
  } = flight;

  const formatedTimeArrival = formatDateToLocalTime(aTimeUTC);
  const formatedDateArrival = formatDateToLocalDate(aTimeUTC);

  const formatedTimeDeparture = formatDateToLocalTime(dTimeUTC);
  const formatedDateDeparture = formatDateToLocalDate(dTimeUTC);

  const returnRoutes = flight.route.filter((route) => route.return === 1);

  console.log(
    returnRoutes.length > 0 && formatDateToLocalTime(returnRoutes[0].dTimeUTC)
  );

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
                {countryTo.name},{" "}
                {returnRoutes[returnRoutes.length - 1].cityFrom}
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
                {formatDateToLocalTime(
                  returnRoutes[returnRoutes.length - 1].aTimeUTC
                )}
              </DateText>
              <DateText>
                {formatDateToLocalDate(
                  returnRoutes[returnRoutes.length - 1].aTimeUTC
                )}
              </DateText>
            </InfoContainer>
          </RouteContainer>
        </>
      ) : null}
    </TripContainer>
  );
};
