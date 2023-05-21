import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { SortBy, SortType } from 'src/enums/sort.enum';

import { sortFlightsData } from './utils';

const testFlight: Flight = {
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

const testFlight2: Flight = {
  ...testFlight,
  price: 110,
  quality: 110,
  duration: {
    departure: 50,
    return: 60,
    total: 110,
  },
};

describe('sortFlightsData', () => {
  it('should return sorted data by price ascending', () => {
    expect(
      sortFlightsData([testFlight, testFlight2], SortBy.Price, SortType.Ascending)?.map((el) => el.price),
    ).toEqual([100, 110]);
  });

  it('should return sorted data by quality descending', () => {
    expect(
      sortFlightsData([testFlight, testFlight2], SortBy.Quality, SortType.Descending)?.map(
        (el) => el.quality,
      ),
    ).toEqual([110, 100]);
  });

  it('should return sorted data by duration ascending', () => {
    expect(
      sortFlightsData([testFlight, testFlight2], SortBy.Duration, SortType.Ascending)?.map(
        (el) => el.duration.total,
      ),
    ).toEqual([100, 110]);
  });

  it('should return sorted data by duration descending', () => {
    expect(
      sortFlightsData([testFlight, testFlight2], SortBy.Duration, SortType.Descending)?.map(
        (el) => el.duration.total,
      ),
    ).toEqual([110, 100]);
  });
});
