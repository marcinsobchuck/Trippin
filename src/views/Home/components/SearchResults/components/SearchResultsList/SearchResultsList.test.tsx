import { useMemo, useReducer } from 'react';

import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { useSearchResults } from 'src/apiServices/hooks/useSearchResults';
import { AuthContext } from 'src/context/AuthContext';
import { testFavouriteFlight, testFlight } from 'src/fixtures/common/common';
import {
  testContextValueWithUser,
  testInitialState,
  testParameters,
  testResponseFlights,
  testVisibleItems,
} from 'src/fixtures/tests/SearchResultsList';
import { useFavourites } from 'src/hooks/useFavourites';
import { ReactQueryProvider } from 'src/ReactQueryProvider';
import { SearchContext } from 'src/views/Home/context/search.context';
import { SearchContextValue } from 'src/views/Home/context/search.types';
import { reducer } from 'src/views/Home/reducer/search.reducer';

import { SearchResultsList } from './SearchResultsList';

jest.mock('react-inlinesvg');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock('src/hooks/useFavourites');

jest.mock('src/apiServices/hooks/useSearchResults');

const mockedUseFavourites = useFavourites as jest.Mock<any>;

const mockedUseSearchResults = useSearchResults as jest.Mock<any>;

const Wrapper: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, testInitialState);

  const value: SearchContextValue = useMemo(() => [state, dispatch], [state, dispatch]);

  return (
    <AuthContext.Provider value={testContextValueWithUser}>
      <SearchContext.Provider value={value}>
        <ReactQueryProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </ReactQueryProvider>
      </SearchContext.Provider>
    </AuthContext.Provider>
  );
};

describe('SearchResultsList', () => {
  it('should render all list items', () => {
    mockedUseFavourites.mockReturnValue({
      data: [],
    });
    mockedUseSearchResults.mockReturnValue({
      data: {
        data: {
          data: [testResponseFlights],
        },
      },
    });
    const { getAllByRole } = render(
      <SearchResultsList visibleItems={testVisibleItems} parameters={testParameters} />,
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
      data: [],
    });
    mockedUseSearchResults.mockReturnValue({
      isLoading: true,
    });

    const { getByTestId } = render(<SearchResultsList visibleItems={[]} parameters={testParameters} />, {
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

    const { getByRole } = render(<SearchResultsList visibleItems={[]} parameters={testParameters} />, {
      wrapper: Wrapper,
    });

    const noResultsHeading = getByRole('heading');
    expect(noResultsHeading).toBeInTheDocument();
  });

  it('should render correct buttons if flight is already liked or not', async () => {
    mockedUseFavourites.mockReturnValue({
      data: [testFavouriteFlight],
    });
    mockedUseSearchResults.mockReturnValue({
      data: {
        data: {
          data: [testFlight, testFavouriteFlight],
        },
      },
    });
    const { getByText } = render(
      <SearchResultsList visibleItems={[testFlight, testFavouriteFlight]} parameters={testParameters} />,
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
