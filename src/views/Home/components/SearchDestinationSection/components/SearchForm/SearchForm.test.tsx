import '@testing-library/jest-dom';
import 'react-dates/initialize';
import React from 'react';

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormikProps } from 'formik';
import moment from 'moment';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';

import { Airport, City, Country } from 'src/apiServices/types/kiwiApi.types';
import { AuthContext } from 'src/context/AuthContext';
import { RegionalSettingsTypes } from 'src/context/AuthContext.types';
import { Locations } from 'src/enums/locations.enum';
import { ReactQueryProvider } from 'src/ReactQueryProvider';
import { SearchProvider } from 'src/views/Home/context/search.context';
import { SearchFormTypes } from 'src/views/Home/types/types';

import { SearchForm } from './SearchForm';

const testLocationAirport: Airport = {
  id: '1',
  city: {
    id: '1',
    code: 'waw',
    continent: {
      id: '1',
      name: 'Europe',
    },
    name: 'Warsaw',
    country: {
      id: '1',
      name: 'Poland',
    },
    timezone: 'utc +1',
  },
  name: 'Chopin',
  type: Locations.Airport,
};

const testLocationCity: City = {
  id: '1',
  name: 'Warsaw',
  country: {
    id: '1',
    name: 'Peru',
  },
  type: Locations.City,
};

const testLocationCountry: Country = {
  id: '1',
  name: 'United States',
  type: Locations.Country,
};

const testCodes = {
  pl: 'Poland',
  pe: 'Peru',
  us: 'United States',
  sz: 'Eswatini',
};

const fakeRecommendedPlace = {
  id: '1',
  place_key: 'test',
  inputText: 'test',
  place: 'test',
  image: 'test',
};

jest.mock('src/firebase', () => ({
  getAuth: jest.fn(),
}));

jest.mock('firebase/auth');

jest.mock('react-inlinesvg');

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

const mockedContextValue = {
  currentUser: null,
  isFirstEntry: false,
  login: jest.fn(),
  signUp: jest.fn(),
  logout: jest.fn(),
  resetPassword: jest.fn(),
  setIsFirstEntry: jest.fn(),
  regionalSettings: mockedRegionalSettings,
  setRegionalSettings: jest.fn(),
};

const server = setupServer(
  rest.get('https://tequila-api.kiwi.com/locations/query', (req, res, ctx) =>
    res(ctx.json({ locations: [testLocationAirport, testLocationCity, testLocationCountry] })),
  ),
  rest.get('https://flagcdn.com/en/codes.json', (req, res, ctx) => res(ctx.json(testCodes))),
);

const Wrapper: React.FC = ({ children }) => (
  <AuthContext.Provider value={mockedContextValue}>
    <SearchProvider>
      <ReactQueryProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ReactQueryProvider>
    </SearchProvider>
  </AuthContext.Provider>
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const today = moment().format('DD/MM/YYYY');
const tommorow = moment().add(1, 'days').format('DD/MM/YYYY');

describe('SearchDestinationSection', () => {
  it('should call submit with values from inputs', async () => {
    const mockSubmit = jest.fn();
    const ref = React.createRef<FormikProps<SearchFormTypes>>();

    const { getByTestId, getAllByRole, getByRole } = render(
      <SearchForm currentRecommendedPlace={fakeRecommendedPlace} formRef={ref} onSubmit={mockSubmit} />,
      { wrapper: Wrapper },
    );

    const flightTypeOnewayInput = getByRole('radio', { name: /oneway/i });
    const flightTypeRoundInput = getByRole('radio', { name: /round/i });
    const flightSettings = getByRole('button', {
      name: /1 0 0 economy/i,
    });

    await userEvent.click(flightTypeOnewayInput);

    await userEvent.click(flightSettings);

    const flightSettingsModal = getByRole('dialog');
    expect(flightSettingsModal).toBeInTheDocument();

    const addAdultButton = getByTestId('add-adult');
    const addChildButton = getByTestId('add-child');
    const addInfantButton = getByTestId('add-infant');
    const cabinClassInput = getByRole('radio', {
      name: /business/i,
    });

    await userEvent.click(addAdultButton);
    await userEvent.click(addChildButton);
    await userEvent.click(addInfantButton);
    await userEvent.click(cabinClassInput);

    await userEvent.click(document.body);

    const startInput = getByRole('textbox', { name: /start/i });
    const destinationInput = getByRole('textbox', { name: /destination/i });

    await userEvent.click(startInput);

    const listboxes = getAllByRole('listbox');
    expect(listboxes[0].childElementCount).toBe(3);

    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    expect(listboxes[0].childElementCount).toBe(0);

    await userEvent.type(destinationInput, 'test');

    expect(listboxes[1].childElementCount).toBe(4);

    const liItems = getAllByRole('option');

    await userEvent.click(liItems[2]);

    const departInput = getByRole('textbox', { name: /depart date/i });
    const returnInput = getByRole('textbox', { name: /return date/i });

    await userEvent.type(departInput, today);
    await userEvent.type(returnInput, tommorow);

    expect(returnInput).not.toHaveValue(tommorow);

    await userEvent.click(flightTypeRoundInput);
    await userEvent.type(returnInput, tommorow);

    expect(returnInput).toHaveValue(tommorow);

    const submitButton = getByRole('button', {
      name: /search flights/i,
    });

    await userEvent.dblClick(submitButton);

    expect(mockSubmit).toBeCalledTimes(1);
    expect(mockSubmit).toHaveBeenCalledWith(
      {
        start: {
          id: '1',
          text: 'Chopin',
        },
        destination: {
          id: '1',
          text: 'United States',
        },
        date: {
          inbound: today,
          outbound: tommorow,
        },
        flightType: 'round',
        flightSettings: {
          adults: 2,
          children: 1,
          infants: 1,
          cabinCode: 'C',
          cabin_key: 'views.home.flightSettings.business',
        },
      },
      expect.any(Object),
    );
  });

  it('should validate inputs correctly and display appropriate error messages', async () => {
    const mockSubmit = jest.fn();
    const ref = React.createRef<FormikProps<SearchFormTypes>>();

    const { getByRole, getByText } = render(
      <SearchForm currentRecommendedPlace={fakeRecommendedPlace} formRef={ref} onSubmit={mockSubmit} />,
      { wrapper: Wrapper },
    );

    const flightTypeOnewayInput = getByRole('radio', { name: /oneway/i });

    const departInput = getByRole('textbox', { name: /depart date/i });
    const submitButton = getByRole('button', {
      name: /search flights/i,
    });

    await userEvent.click(submitButton);

    expect(mockSubmit).not.toBeCalled();

    const startInput = getByRole('textbox', { name: /start/i });
    const start = getByText(/start/i);
    const departDate = getByText(/depart/i);
    const returnDate = getByText(/return/i);

    const startError = within(start).getByText(/required/i);
    const departError = within(departDate).getByText(/required/i);
    const returnError = within(returnDate).getByText(/required/i);

    const errors = [startError, departError, returnError];

    errors.forEach((error) => expect(error).toBeInTheDocument());

    await userEvent.click(flightTypeOnewayInput);

    await userEvent.click(startInput);
    await userEvent.keyboard('[ArrowDown]');
    await userEvent.keyboard('[Enter]');

    await userEvent.type(departInput, today);

    errors.forEach((error) => expect(error).not.toBeInTheDocument());
  });
});
