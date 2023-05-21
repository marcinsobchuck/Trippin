import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { SortBy, SortType } from 'src/enums/sort.enum';

export const sortFlightsData = (flights: Flight[] | undefined, key: SortBy, sortType: SortType) =>
  flights?.sort((a, b) => {
    if (key === SortBy.Duration) {
      if (sortType) {
        return a.duration.total - b.duration.total;
      }
      return b.duration.total - a.duration.total;
    }
    if (sortType) {
      return a[key] - b[key];
    }
    return b[key] - a[key];
  });
