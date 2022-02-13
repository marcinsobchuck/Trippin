import React from "react";
import { useSearchContext } from "src/components/Search/hooks/useSearchContext";
import { Colors } from "src/enums/colors.enum";
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
} from "./FlightRoute.styled";
import { FlightRouteProps } from "./FlightRoute.types";

export const FlightRoute: React.FC<FlightRouteProps> = ({
  routeType,
  data,
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
  const [state] = useSearchContext();
  const { cabinClass } = state;

  return (
    <>
      {" "}
      <FlightGeneralInfo>
        <FlightGeneralInfoItem>
          <strong>{routeType}</strong>
        </FlightGeneralInfoItem>
        <FlightGeneralInfoItem>
          <StyledFA className='far fa-calendar-alt' />
          <span>{departDate}</span>
        </FlightGeneralInfoItem>
        <FlightGeneralInfoItem>
          <StyledFA className='far fa-clock' />
          <span>{flyDuration}</span>
        </FlightGeneralInfoItem>
      </FlightGeneralInfo>
      <FlightDirection>
        <p>TO {routeDirection}</p>
      </FlightDirection>
      <FlightDetailsWrapper>
        <FlightDetailsItem>
          <FlightDetailsItemIcon>
            <i className='fas fa-circle' />
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
            <i className='fas fa-arrow-down' style={{ marginLeft: "1px" }} />
          </FlightDetailsItemIcon>

          <BadgesWrapper>
            <FlightBadge color={Colors.Blue} bgColor={Colors.LighterBlue}>
              {data.fly_duration}
            </FlightBadge>
            <FlightBadge color={Colors.Gray} bgColor={Colors.LightGray}>
              <p>Stops: {stops}</p>
            </FlightBadge>
            <FlightBadge color={Colors.DarkGreen} bgColor={Colors.LightGreen}>
              {cabinClass.text}
            </FlightBadge>
          </BadgesWrapper>
        </FlightDetailsItem>
        <FlightDetailsItem>
          <FlightDetailsItemIcon>
            <i className='fas fa-circle' />
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
