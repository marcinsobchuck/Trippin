import { act, renderHook } from '@testing-library/react-hooks';
import firebaseAuth from 'firebase/auth';

import { FavouriteFlight, useFavourites } from './useFavourites';

const mockedFavouriteFlight: FavouriteFlight = {
  id: 'ABC123',
  airlines: ['Airline A', 'Airline B'],
  availability: {
    seats: 50,
  },
  cityCodeFrom: 'FROM',
  cityCodeTo: 'TO',
  cityFrom: 'City From',
  cityTo: 'City To',
  countryFrom: {
    code: 'CF',
    name: 'Country From',
  },
  countryTo: {
    code: 'CT',
    name: 'Country To',
  },
  aTime: 1621834200,
  dTime: 1621818600,
  aTimeUTC: 1621837800,
  dTimeUTC: 1621822200,
  deep_link: 'https://example.com/flight/ABC123',
  distance: 1000,
  flyFrom: 'Airport From',
  flyTo: 'Airport To',
  fly_duration: '2h 30m',
  return_duration: '3h 15m',
  price: 500,
  route: [
    {
      id: 'R1',
      aTime: 1621822200,
      dTime: 1621818600,
      aTimeUTC: 1621825800,
      dTimeUTC: 1621822200,
      airline: 'Airline A',
      cityFrom: 'City From',
      cityTo: 'City To',
      flyFrom: 'Airport From',
      flyTo: 'Airport To',
      flight_no: 123,
    },
    {
      id: 'R2',
      aTime: 1621837800,
      dTime: 1621834200,
      aTimeUTC: 1621841400,
      dTimeUTC: 1621837800,
      airline: 'Airline B',
      cityFrom: 'City To',
      cityTo: 'City From',
      flyFrom: 'Airport To',
      flyTo: 'Airport From',
      flight_no: 456,
    },
  ],
  nightsInDest: null,
  has_airport_change: true,
  quality: 8.5,
  duration: {
    departure: 9000,
    return: 11700,
    total: 20700,
  },
  currency: 'USD',
};

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}));

const firebaseAuthMocked = firebaseAuth.getAuth as jest.Mocked<any>;

firebaseAuthMocked.mockReturnValueOnce({
  currentUser: { email: 'example@gmail.com', uid: 1, emailVerified: true },
});

describe('useFavourites', () => {
  it.only('should delete item from array', async () => {
    const mockedData = [mockedFavouriteFlight];

    const { result } = renderHook(() => useFavourites(firebaseAuthMocked.currentUser, mockedData));

    act(() => {
      result.current.deleteFavouriteTrip('ABC123');
    });

    expect(result.current.data).toEqual([]);
  });
});
