import React, { useRef } from 'react';

import { animated } from 'react-spring';

import closeIcon from 'src/assets/images/close.svg';

import { useAuth } from 'src/hooks/useAuth';
import { useOnClickOutside } from 'src/hooks/useClickOutside';
import { useLockBodyScroll } from 'src/hooks/useLockBodyScroll';
import { useModalAnimation } from 'src/hooks/useModalAnimation';
import { Button } from 'src/styles/Button.styled';
import { useSearchContext } from 'src/views/Home/hooks/useSearchContext';

import { ModalOverlay } from '../../../SearchDestinationSection/components/RegionalSettingsModal/RegionalSettingsModal.styled';
import { useRoutes } from '../../hooks/useRoutes';
import { formatTime, getDateDifference } from '../../utils';

import {
  AdditionalInfo,
  ButtonWrapper,
  CloseIcon,
  IconWrapper,
  Layover,
  MainContent,
  ModalHeader,
  ModalRoute,
  RouteDetailRow,
  RouteDetails,
  RouteHeader,
  RoutesWrapper,
  StyledNumber,
  StyledTime,
  Wrapper,
} from './FlightDetailsModal.styled';
import { FlightDetailsModalProps } from './FlightDetailsModal.types';

export const FlightDetailsModal: React.FC<FlightDetailsModalProps> = ({
  showFlightDetailsModal,
  setShowFlightDetailsModal,
  data,
}) => {
  const flightDetailsModalTransition = useModalAnimation(showFlightDetailsModal);

  const ref = useRef(null);

  const [
    {
      searchFormData: { flightType },
    },
  ] = useSearchContext();

  const routes = useRoutes(data);

  const {
    regionalSettings: {
      currency: { currencyCode },
    },
  } = useAuth();

  useOnClickOutside(ref, () => setShowFlightDetailsModal(false));
  useLockBodyScroll(showFlightDetailsModal);

  return (
    <ModalOverlay isOpen={showFlightDetailsModal}>
      {flightDetailsModalTransition(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                ...styles,
                position: 'absolute',
                zIndex: 3000,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Wrapper ref={ref}>
                <IconWrapper onClick={() => setShowFlightDetailsModal(false)}>
                  <CloseIcon src={closeIcon} />
                </IconWrapper>
                <ModalHeader>
                  <h2>Itinerary details</h2>
                  <p>
                    {data?.price} {currencyCode}
                  </p>
                </ModalHeader>
                <MainContent>
                  <RouteHeader>
                    <p>
                      To {data?.cityTo}, {data?.cityCodeTo}
                    </p>
                    <p>
                      Total duration:
                      {data?.fly_duration}
                    </p>
                  </RouteHeader>
                  <RoutesWrapper>
                    {routes?.departRoutes.map((departRoute, index) => (
                      <div key={departRoute.id}>
                        <ModalRoute>
                          <StyledNumber>{index + 1}.</StyledNumber>
                          <RouteDetails>
                            <RouteDetailRow>
                              <StyledTime>{formatTime(departRoute.dTime)}</StyledTime>
                              <p>{departRoute.cityFrom}</p>
                            </RouteDetailRow>
                            <RouteDetailRow>
                              <StyledTime>{formatTime(departRoute.aTime)}</StyledTime>
                              {departRoute.cityTo}
                            </RouteDetailRow>

                            <AdditionalInfo>
                              <p>
                                Duration: {getDateDifference(departRoute.dTimeUTC, departRoute.aTimeUTC)}{' '}
                              </p>
                              <p>
                                Flight no: {departRoute.airline} {departRoute.flight_no}
                              </p>
                            </AdditionalInfo>
                          </RouteDetails>
                        </ModalRoute>

                        {routes?.departRoutes[index + 1] && (
                          <Layover>
                            <p>
                              <i className="far fa-clock" />
                              layover{' '}
                              {getDateDifference(
                                departRoute.aTimeUTC,
                                routes?.departRoutes[index + 1]?.dTimeUTC,
                              )}
                            </p>
                          </Layover>
                        )}
                      </div>
                    ))}
                  </RoutesWrapper>
                  {flightType === 'round' && (
                    <>
                      <RouteHeader>
                        <p>
                          To {data?.cityFrom}, {data?.cityCodeFrom}
                        </p>
                        <p>
                          Total duration:
                          {data?.return_duration}
                        </p>
                      </RouteHeader>
                      <RoutesWrapper>
                        {routes?.returnRoutes.map((returnRoute, index) => (
                          <div key={returnRoute.id}>
                            <ModalRoute>
                              <StyledNumber>{index + 1}.</StyledNumber>
                              <RouteDetails>
                                <RouteDetailRow>
                                  <StyledTime>{formatTime(returnRoute.dTime)}</StyledTime>
                                  <p>{returnRoute.cityFrom}</p>
                                </RouteDetailRow>
                                <RouteDetailRow>
                                  <StyledTime>{formatTime(returnRoute.aTime)}</StyledTime>
                                  {returnRoute.cityTo}
                                </RouteDetailRow>

                                <AdditionalInfo>
                                  <p>
                                    Duration: {getDateDifference(returnRoute.dTimeUTC, returnRoute.aTimeUTC)}{' '}
                                  </p>
                                  <p>
                                    Flight no: {returnRoute.airline} {returnRoute.flight_no}
                                  </p>
                                </AdditionalInfo>
                              </RouteDetails>
                            </ModalRoute>

                            {routes?.returnRoutes[index + 1] && (
                              <Layover>
                                {' '}
                                <p>
                                  <i className="far fa-clock" />
                                  layover{' '}
                                  {getDateDifference(
                                    returnRoute.aTimeUTC,
                                    routes?.returnRoutes[index + 1]?.dTimeUTC,
                                  )}
                                </p>
                              </Layover>
                            )}
                          </div>
                        ))}
                      </RoutesWrapper>
                    </>
                  )}
                </MainContent>
                <ButtonWrapper>
                  <a href={data?.deep_link} target="_blank" rel="noopener noreferrer">
                    <Button variant="quaternary">See on kiwi.com</Button>
                  </a>
                </ButtonWrapper>
              </Wrapper>
            </animated.div>
          ),
      )}
    </ModalOverlay>
  );
};
