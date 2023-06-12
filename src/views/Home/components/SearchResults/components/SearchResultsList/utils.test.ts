import { SortBy, SortType } from 'src/enums/sort.enum';
import { testFlight } from 'src/fixtures/common/common';
import { testFlight2 } from 'src/fixtures/tests/sortFlightsData';

import { sortFlightsData } from './utils';

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
