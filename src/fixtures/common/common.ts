import { Airport, City, Country, Flight } from 'src/apiServices/types/kiwiApi.types';
import { RegionalSettingsTypes } from 'src/context/AuthContext.types';
import { Locations } from 'src/enums/locations.enum';

export const testLocationAirport: Airport = {
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

export const testLocationCity: City = {
  id: '1',
  name: 'Warsaw',
  country: {
    id: '1',
    name: 'Peru',
  },
  type: Locations.City,
};

export const testLocationCountry: Country = {
  id: '1',
  name: 'United States',
  type: Locations.Country,
};

export const testCodes = {
  pl: 'Poland',
  pe: 'Peru',
  us: 'United States',
  sz: 'Eswatini',
};

export const testFlight: Flight = {
  id: '1',
  airlines: ['a'],
  availability: {
    seats: 1,
  },
  cityCodeFrom: 'a',
  cityCodeTo: 'a',
  cityFrom: 'a',
  cityTo: 'a',
  countryFrom: {
    code: 'a',
    name: 'a',
  },
  countryTo: {
    code: 'a',
    name: 'a',
  },
  aTime: 1,
  dTime: 1,
  aTimeUTC: 1,
  dTimeUTC: 1,
  deep_link: 'a',
  distance: 1,
  flyFrom: 'a',
  flyTo: 'a',
  fly_duration: '1',
  return_duration: '1',
  price: 100,
  route: [
    {
      id: 'a',
      aTime: 1,
      dTime: 1,
      aTimeUTC: 1,
      dTimeUTC: 1,
      airline: 'a',
      cityFrom: 'a',
      cityTo: 'a',
      flyFrom: 'a',
      flyTo: 'a',
      flight_no: 1,
      return: 1,
    },
  ],
  nightsInDest: 1,
  has_airport_change: false,
  quality: 100,
  duration: {
    departure: 50,
    return: 50,
    total: 100,
  },
};

export const testFavouriteFlight = { ...testFlight, id: '2', currency: 'USD' };

export const testRegionalSettings: RegionalSettingsTypes = {
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
