import { Flight } from 'src/apiServices/types/kiwiApi.types';

export interface FlightRouteProps {
  routeType: string;
  data: Flight;
  stops: number | undefined;
  departTime: string | undefined;
  arrivalTime: string | undefined;
  departDate: string | undefined;
  routeDirection: string | undefined;
  cityFrom: string | undefined;
  airportCodeFrom: string | undefined;
  cityTo: string | undefined;
  airportCodeTo: string | undefined;
  flyDuration: string;
}

export interface FlightBadgeProps {
  bgColor: string;
  color: string;
}
