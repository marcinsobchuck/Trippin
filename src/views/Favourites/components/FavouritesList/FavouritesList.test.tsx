/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { FavouriteFlight, useFavourites } from 'src/hooks/useFavourites';

import { FavouritesList } from './FavouritesList';

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

jest.mock('src/firebase', () => ({
  getAuth: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock('src/hooks/useFavourites');

const Wrapper: React.FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

const mockedUseFavourites = useFavourites as jest.Mock<any>;

describe('FavouritesList', () => {
  it('should render FavouriteList component without errors', () => {
    const mockData = [mockedFavouriteFlight];

    mockedUseFavourites.mockReturnValue({
      data: mockData,
    });

    const { getByTestId } = render(<FavouritesList />, { wrapper: Wrapper });

    expect(getByTestId('test-favourite-trip')).toBeInTheDocument();
  });

  it('should render loading spinner when data is fetching', () => {
    mockedUseFavourites.mockReturnValue({
      isLoading: true,
    });

    const { getByTestId } = render(<FavouritesList />, { wrapper: Wrapper });

    expect(getByTestId('oval-loading')).toBeInTheDocument();
  });

  it('should render no results information if there are no favourite trips', () => {
    mockedUseFavourites.mockReturnValue({
      data: [],
    });

    const { getByTestId, getByText } = render(<FavouritesList />, { wrapper: Wrapper });

    expect(getByTestId('test-favourites-no-results')).toBeInTheDocument();
    expect(getByText('views.favourites.buttons.search')).toBeInTheDocument();
  });
});
