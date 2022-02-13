import React from "react";
import { useSearchContext } from "src/components/Search/hooks/useSearchContext";
import {
  ItemWrapper,
  FlightDirections,
  StyledIcon,
  SectionDivider,
  ButtonsWrapper,
  FlightWrapper,
  Price,
  FlightDirectionsWrapper,
  DetailsButton,
} from "./SearchResultsListItem.styled";
import rarrow from "src/assets/images/rarrow.svg";
import { useAuth } from "src/hooks/useAuth";
import { Button } from "src/styles/Button.styled";
import { FlightRoute } from "./FlightRoute";
import { SearchResultsListItemProps } from "./SearchResultsListItem.types";
import { formatDateToLocalDate, formatDateToLocalTime } from "../utils";
import { useRoutes } from "../hooks/useRotues";

export const SearchResultsListItem: React.FC<SearchResultsListItemProps> = ({
  data,
  setShowFlightDetailsModal,
  setActiveFlight,
}) => {
  const [{ flightType }] = useSearchContext();

  const { regionalSettings } = useAuth();

  const routes = useRoutes(data);

  const handleItemClick = () => {
    setShowFlightDetailsModal(true);
    setActiveFlight(data);
  };

  const renderContent = () => {
    if (flightType === "round") {
      return (
        <ItemWrapper key={data.id} onClick={handleItemClick}>
          <FlightWrapper>
            <FlightDirections>
              <FlightDirectionsWrapper>
                <p>
                  {data.cityFrom}, {data.flyFrom}
                </p>
                <StyledIcon src={rarrow} />
                <p>
                  {data.cityTo}, {data.flyTo}
                </p>
              </FlightDirectionsWrapper>
              <Price>
                {data.price} {regionalSettings.currency.currencyCode}
              </Price>
            </FlightDirections>

            <FlightRoute
              data={data}
              routeType='Departure'
              departDate={formatDateToLocalDate(data.dTimeUTC)}
              departTime={formatDateToLocalTime(data.dTimeUTC)}
              arrivalTime={formatDateToLocalTime(data.aTimeUTC)}
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
                {data.nightsInDest} nights in {data.cityTo}
              </span>
            </SectionDivider>

            {routes?.returnRoutes && (
              <FlightRoute
                data={data}
                routeType='Return'
                departDate={formatDateToLocalDate(
                  routes.returnRoutes[routes.returnRoutes.length - 1].aTimeUTC
                )}
                departTime={formatDateToLocalTime(
                  routes.returnRoutes[0].dTimeUTC
                )}
                arrivalTime={formatDateToLocalTime(
                  routes?.returnRoutes[routes.returnRoutes.length - 1].aTimeUTC
                )}
                stops={routes.returnRoutes.length - 1}
                routeDirection={
                  routes.returnRoutes[routes.returnRoutes.length - 1].cityTo
                }
                cityFrom={routes.returnRoutes[0].cityFrom}
                airportCodeFrom={routes?.returnRoutes[0].flyFrom}
                cityTo={
                  routes.returnRoutes[routes.returnRoutes.length - 1].cityTo
                }
                airportCodeTo={
                  routes.returnRoutes[routes.returnRoutes.length - 1].flyTo
                }
                flyDuration={data.return_duration}
              />
            )}
          </FlightWrapper>
          <ButtonsWrapper>
            <DetailsButton>
              <i className='fas fa-chevron-down' /> Show details
            </DetailsButton>
            <a href={data.deep_link} target='_blank' rel='noopener noreferrer'>
              <Button variant='quaternary'>See on kiwi.com</Button>
            </a>
          </ButtonsWrapper>
        </ItemWrapper>
      );
    }
    if (flightType === "oneway") {
      return (
        <ItemWrapper key={data.id} onClick={handleItemClick}>
          <FlightWrapper>
            <FlightDirections>
              <FlightDirectionsWrapper>
                <p>
                  {data.cityFrom}, {data.flyFrom}
                </p>
                <StyledIcon src={rarrow} />
                <p>
                  {data.cityTo}, {data.flyTo}
                </p>
              </FlightDirectionsWrapper>
              <Price>
                {data.price} {regionalSettings.currency.currencyCode}
              </Price>
            </FlightDirections>
            <FlightRoute
              data={data}
              routeType='Departure'
              departDate={formatDateToLocalDate(data.dTimeUTC)}
              departTime={formatDateToLocalTime(data.dTimeUTC)}
              arrivalTime={formatDateToLocalTime(data.aTimeUTC)}
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
              <i className='fas fa-chevron-down' /> Show details
            </DetailsButton>
            <a href={data.deep_link} target='_blank' rel='noopener noreferrer'>
              <Button variant='quaternary'>See on kiwi.com</Button>
            </a>
          </ButtonsWrapper>
        </ItemWrapper>
      );
    }
  };
  return <>{renderContent()}</>;
};
