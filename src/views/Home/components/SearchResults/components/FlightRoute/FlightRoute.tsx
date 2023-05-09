import React from 'react';

import { useTranslation } from 'react-i18next';

import { Colors } from 'src/enums/colors.enum';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import {
  BadgesWrapper,
  FlightBadge,
  FlightDetails,
  FlightDetailsItem,
  FlightDetailsItemIcon,
  FlightDetailsWrapper,
  FlightDirection,
  FlightGeneralInfo,
  FlightGeneralInfoItem,
  StyledFA,
} from './FlightRoute.styled';
import { FlightRouteProps } from './FlightRoute.types';

export const FlightRoute: React.FC<FlightRouteProps> = ({
  routeType,
  stops,
  departTime,
  arrivalTime,
  departDate,
  routeDirection,
  cityFrom,
  airportCodeFrom,
  cityTo,
  airportCodeTo,
  flyDuration,
}) => {
  const [
    {
      searchFormData: { flightSettings },
    },
  ] = useSearchContext();

  const { t } = useTranslation();

  return (
    <>
      <FlightGeneralInfo>
        <FlightGeneralInfoItem>
          <strong>{routeType}</strong>
        </FlightGeneralInfoItem>
        <FlightGeneralInfoItem>
          <StyledFA className="far fa-calendar-alt" />
          <span>{departDate}</span>
        </FlightGeneralInfoItem>
        <FlightGeneralInfoItem>
          <StyledFA className="far fa-clock" />
          <span>{flyDuration}</span>
        </FlightGeneralInfoItem>
      </FlightGeneralInfo>
      <FlightDirection>
        <p>
          <span>{t('views.home.flightRoute.direction')}: </span>
          {routeDirection}
        </p>
      </FlightDirection>
      <FlightDetailsWrapper>
        <FlightDetailsItem>
          <FlightDetailsItemIcon>
            <i className="fas fa-circle" />
          </FlightDetailsItemIcon>

          <FlightDetails>
            <p>{departTime}</p>
            <p>
              {cityFrom}, {airportCodeFrom}
            </p>
          </FlightDetails>
        </FlightDetailsItem>
        <FlightDetailsItem>
          <FlightDetailsItemIcon>
            <i className="fas fa-arrow-down" style={{ marginLeft: '1px' }} />
          </FlightDetailsItemIcon>

          <BadgesWrapper>
            <FlightBadge color={Colors.Blue} bgColor={Colors.LighterBlue}>
              {flyDuration}
            </FlightBadge>
            <FlightBadge color={Colors.Gray} bgColor={Colors.LightGray}>
              <p>
                {t('views.home.flightRoute.stops')}: {stops}
              </p>
            </FlightBadge>
            <FlightBadge color={Colors.DarkGreen} bgColor={Colors.LightGreen}>
              {t(flightSettings.cabin_key)}
            </FlightBadge>
          </BadgesWrapper>
        </FlightDetailsItem>
        <FlightDetailsItem>
          <FlightDetailsItemIcon>
            <i className="fas fa-circle" />
          </FlightDetailsItemIcon>

          <FlightDetails>
            <p>{arrivalTime}</p>
            <p>
              {cityTo}, {airportCodeTo}
            </p>
          </FlightDetails>
        </FlightDetailsItem>
      </FlightDetailsWrapper>
    </>
  );
};
