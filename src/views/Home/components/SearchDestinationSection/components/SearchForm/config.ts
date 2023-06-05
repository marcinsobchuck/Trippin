import { SearchFormTypes } from 'src/views/Home/types/types';

export const initialValues: SearchFormTypes = {
  start: {
    id: '',
    text: '',
  },
  destination: {
    id: '',
    text: '',
  },
  date: {
    inbound: '',
    outbound: '',
  },
  flightType: 'round',
  flightSettings: {
    adults: 1,
    children: 0,
    infants: 0,
    cabinCode: 'M',
    cabin_key: 'views.home.flightSettings.economy',
  },
};
