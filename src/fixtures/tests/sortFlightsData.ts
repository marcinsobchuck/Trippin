import { Flight } from 'src/apiServices/types/kiwiApi.types';

import { testFlight } from '../common/common';

export const testFlight2: Flight = {
  ...testFlight,
  price: 110,
  quality: 110,
  duration: {
    departure: 50,
    return: 60,
    total: 110,
  },
};
