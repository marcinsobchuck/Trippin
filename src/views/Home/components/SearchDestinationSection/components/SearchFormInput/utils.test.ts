import airplaneIcon from 'src/assets/images/airplane.svg';
import cityIcon from 'src/assets/images/city.svg';
import countryIcon from 'src/assets/images/country.svg';

import {
  testCodes,
  testLocationAirport,
  testLocationCity,
  testLocationCountry,
} from 'src/fixtures/common/common';
import { testLocationsOne, testLocationsTwo } from 'src/fixtures/tests/convertLanguageCodes';

import { convertLanguageCodes, getCurrentCodes, getLocationParameters } from './utils';

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
