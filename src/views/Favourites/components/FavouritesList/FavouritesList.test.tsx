import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { testFavouriteFlight } from 'src/fixtures/common/common';
import { useFavourites } from 'src/hooks/useFavourites';

import { FavouritesList } from './FavouritesList';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: any) => key }),
}));

jest.mock('src/hooks/useFavourites');

const Wrapper: React.FC = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

const mockedUseFavourites = useFavourites as jest.Mock<any>;

describe('FavouritesList', () => {
  it('should render FavouriteList component without errors', () => {
    const mockData = [testFavouriteFlight];

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
