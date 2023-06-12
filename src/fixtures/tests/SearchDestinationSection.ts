import { testRegionalSettings } from '../common/common';

export const testRecommendedPlace = {
  id: '1',
  place_key: 'test',
  inputText: 'test',
  place: 'test',
  image: 'test',
};

export const testContextValue = {
  currentUser: null,
  isFirstEntry: false,
  login: jest.fn(),
  signUp: jest.fn(),
  logout: jest.fn(),
  resetPassword: jest.fn(),
  setIsFirstEntry: jest.fn(),
  regionalSettings: testRegionalSettings,
  setRegionalSettings: jest.fn(),
};
