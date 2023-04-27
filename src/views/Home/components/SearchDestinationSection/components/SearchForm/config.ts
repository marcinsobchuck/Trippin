import { SearchFormTypes } from 'src/shared/types';

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
    cabinClass: 'Economy',
  },
};
