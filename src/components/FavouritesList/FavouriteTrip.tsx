import React from "react";
import { Flight } from "src/apiServices/types/kiwiApi.types";
import { useRoutes } from "../Search/components/SearchResults/hooks/useRotues";
import {
  formatDateToLocalDate,
  formatDateToLocalTime,
} from "../Search/components/SearchResults/utils";

import {
  DateText,
  Divider,
  FontAwesomeIcon,
  InfoContainer,
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

  return (
    <TripContainer>
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
      {returnDuration !== 0 && <InfoContainer>ok</InfoContainer>}
    </TripContainer>
  );
};
