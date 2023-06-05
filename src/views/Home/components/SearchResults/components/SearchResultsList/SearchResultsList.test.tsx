import '@testing-library/jest-dom';
import { useMemo, useReducer } from 'react';

import { render } from '@testing-library/react';
import { User } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { Flight, SearchParameters } from 'src/apiServices/types/kiwiApi.types';
import { AuthContext } from 'src/context/AuthContext';
import { RegionalSettingsTypes } from 'src/context/AuthContext.types';
import { SortBy, SortType } from 'src/enums/sort.enum';
import { useFavourites } from 'src/hooks/useFavourites';
import { ReactQueryProvider } from 'src/ReactQueryProvider';
import { SearchContext } from 'src/views/Home/context/search.context';
import { SearchContextValue } from 'src/views/Home/context/search.types';
import { initialState, reducer } from 'src/views/Home/reducer/search.reducer';
import { SearchState } from 'src/views/Home/reducer/types/searchReducer.types';

import { SearchResultsList } from './SearchResultsList';

const mockedParameters: SearchParameters = {
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

const mockedRegionalSettings: RegionalSettingsTypes = {
  language: {
    languageCode: 'en',
    flag: 'test',
    language_key: 'views.home.languages.english',
  },
  currency: {
    currency_key: 'views.home.currencies.dollar',
    currencyCode: 'USD',
    currencyIcon: 'test',
  },
};

const mockedUser = {} as User;

const mockedContextValue = {
  currentUser: mockedUser,
  isFirstEntry: false,
  login: jest.fn(),
  signUp: jest.fn(),
  logout: jest.fn(),
  resetPassword: jest.fn(),
  setIsFirstEntry: jest.fn(),
  regionalSettings: mockedRegionalSettings,
  setRegionalSettings: jest.fn(),
};

const mockedFlight: Flight = {
  id: '1',
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
};

const adjustIds = (array: Flight[]) =>
  array.map((el: Flight, index) => ({
    ...el,
    id: index.toString(),
  }));

const mockedFavouriteFlight = { ...mockedFlight, id: '2', currency: 'USD' };
const mockedResponseFlights: Flight[] = adjustIds(Array(13).fill(mockedFlight));
const mockedVisibleItems: Flight[] = adjustIds(Array(8).fill(mockedFlight));

jest.mock('src/firebase', () => ({
  getAuth: jest.fn(),
}));

jest.mock('react-inlinesvg');

jest.mock('firebase/auth');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock('src/hooks/useFavourites');

jest.mock('src/apiServices/hooks/useSearchResults');

const mockedUseFavourites = useFavourites as jest.Mock<any>;

const mockedUseSearchResults = useSearchResults as jest.Mock<any>;

const mockedInitialState: SearchState = {
  ...initialState,
  searchFormData: {
    ...initialState.searchFormData,
    start: {
      id: '1',
      text: 'waw',
    },
  },
};

const Wrapper: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, mockedInitialState);

  const value: SearchContextValue = useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <AuthContext.Provider value={mockedContextValue}>
      <SearchContext.Provider value={value}>
        <ReactQueryProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </ReactQueryProvider>
      </SearchContext.Provider>
    </AuthContext.Provider>
  );
};

describe('SearchResultsList', () => {
  it('should render all list items', async () => {
    mockedUseFavourites.mockReturnValue({
      data: [mockedFavouriteFlight],
    });
    mockedUseSearchResults.mockReturnValue({
      data: {
        data: {
          data: [mockedResponseFlights],
        },
      },
    });
    const { getAllByRole } = render(
      <SearchResultsList visibleItems={mockedVisibleItems} parameters={mockedParameters} />,
      {
        wrapper: Wrapper,
      },
    );

    const listItems = getAllByRole('listitem');

    expect(listItems.length).toBe(8);

    listItems.forEach((item) => expect(item).toBeInTheDocument());
  });

  it('should render loading state', () => {
    mockedUseFavourites.mockReturnValue({
      data: [mockedFavouriteFlight],
    });
    mockedUseSearchResults.mockReturnValue({
      isLoading: true,
    });

    const { getByTestId } = render(<SearchResultsList visibleItems={[]} parameters={mockedParameters} />, {
      wrapper: Wrapper,
    });

    const loader = getByTestId('oval-loading');

    expect(loader).toBeInTheDocument();
  });

  it('should render proper information if there are no results', () => {
    mockedUseFavourites.mockReturnValue({
      data: [],
    });
    mockedUseSearchResults.mockReturnValue({
      data: {
        data: {
          data: [],
        },
      },
    });

    const { getByRole } = render(<SearchResultsList visibleItems={[]} parameters={mockedParameters} />, {
      wrapper: Wrapper,
    });

    const noResultsHeading = getByRole('heading');
    expect(noResultsHeading).toBeInTheDocument();
  });

  it('should render correct buttons if flight is already liked or not', async () => {
    mockedUseFavourites.mockReturnValue({
      data: [mockedFavouriteFlight],
    });
    mockedUseSearchResults.mockReturnValue({
      data: {
        data: {
          data: [mockedFlight, mockedFavouriteFlight],
        },
      },
    });
    const { getByText } = render(
      <SearchResultsList
        visibleItems={[mockedFlight, mockedFavouriteFlight]}
        parameters={mockedParameters}
      />,
      {
        wrapper: Wrapper,
      },
    );

    const saveButton = getByText(/save/i);
    const deleteButton = getByText(/delete/i);

    expect(saveButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });
});
