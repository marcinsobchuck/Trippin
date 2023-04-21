import { Flight } from 'src/apiServices/types/kiwiApi.types';

export interface FlightDetailsModalProps {
  showFlightDetailsModal: boolean;
  setShowFlightDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Flight | undefined;
}
