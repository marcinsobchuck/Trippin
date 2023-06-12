import { User } from 'firebase/auth';

import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';
import { SortBy, SortType } from 'src/enums/sort.enum';
import { initialState } from 'src/views/Home/reducer/search.reducer';
import { SearchState } from 'src/views/Home/reducer/types/searchReducer.types';

import { testFlight, testRegionalSettings } from '../common/common';

const adjustIds = (array: Flight[]) =>
  array.map((el: Flight, index) => ({
    ...el,
    id: index.toString(),
  }));

export const testParameters: SearchParameters = {
  fly_from: 'warsaw_pl',
  fly_to: 'FR',
  date_from: '06/07/2023',
  date_to: '06/07/2023',
  return_from: '13/07/2023',
  return_to: '13/07/2023',
  flight_type: 'round',
  adults: 1,
  children: 0,
  infants: 0,
  selected_cabins: 'M',
  curr: 'PLN',
  locale: 'en',
  limit: 300,
  price_from: 0,
  price_to: 0,
  sort: SortBy.Price,
  asc: SortType.Ascending,
  max_stopovers: 0,
};

const testUser = {} as User;

export const testContextValueWithUser = {
  currentUser: testUser,
  isFirstEntry: false,
  login: jest.fn(),
  signUp: jest.fn(),
  logout: jest.fn(),
  resetPassword: jest.fn(),
  setIsFirstEntry: jest.fn(),
  regionalSettings: testRegionalSettings,
  setRegionalSettings: jest.fn(),
};

export const testResponseFlights: Flight[] = adjustIds(Array(13).fill(testFlight));
export const testVisibleItems: Flight[] = adjustIds(Array(8).fill(testFlight));

export const testInitialState: SearchState = {
  ...initialState,
  searchFormData: {
    ...initialState.searchFormData,
    start: {
      id: '1',
      text: 'waw',
    },
  },
};
