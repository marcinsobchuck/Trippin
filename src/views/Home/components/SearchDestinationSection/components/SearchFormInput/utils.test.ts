import airplaneIcon from 'src/assets/images/airplane.svg';
import cityIcon from 'src/assets/images/city.svg';
import countryIcon from 'src/assets/images/country.svg';

import { Airport, City, Country, Location } from 'src/apiServices/types/kiwiApi.types';
import { Locations } from 'src/enums/locations.enum';

import { convertLanguageCodes, getCurrentCodes, getLocationParameters } from './utils';

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

const testUnpopularLocationCountry: Country = {
  id: '1',
  name: 'Swaziland',
  type: Locations.Country,
};

const testCodes = {
  pl: 'Poland',
  pe: 'Peru',
  us: 'United States',
  sz: 'Eswatini',
};

const testLocationsOne: Location[] = [testLocationAirport, testLocationCity, testLocationCountry];

const testLocationsTwo: Location[] = [
  testUnpopularLocationCountry,
  testLocationAirport,
  testLocationCity,
  testLocationCountry,
];

describe('convertLanguageCodes', () => {
  it('should properly convert langauge code', () => {
    expect(convertLanguageCodes('pl')).toBe('pl-PL');
    expect(convertLanguageCodes('en')).toBe('en-EN');
  });
});

describe('getLocationParameters', () => {
  it('should return location parameters for airport', () => {
    expect(getLocationParameters(testLocationAirport)).toEqual({
      name: testLocationAirport.city.country.name,
      icon: airplaneIcon,
    });
  });

  it('should return location parameters for city', () => {
    expect(getLocationParameters(testLocationCity)).toEqual({
      name: testLocationCity.country.name,
      icon: cityIcon,
    });
  });
  it('should return location parameters for country', () => {
    expect(getLocationParameters(testLocationCountry)).toEqual({
      name: testLocationCountry.name,
      icon: countryIcon,
    });
  });
});

describe('getCurrentCodes', () => {
  it('should return country codes for provided locations and codes', () => {
    expect(getCurrentCodes(testLocationsOne, testCodes)).toEqual(['pl', 'pe', 'us']);
  });

  it('should return undefined for first location and country code for the rest', () => {
    expect(getCurrentCodes(testLocationsTwo, testCodes)).toEqual([undefined, 'pl', 'pe', 'us']);
  });

  it('should return empty array if locations and codes are empty', () => {
    expect(getCurrentCodes([], {})).toEqual([]);
  });
});
