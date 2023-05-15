import { SortBy, SortType } from 'src/enums/sort.enum';

import { Option } from '../FilterAndSort/FilterAndSort.types';

export const options: Option[] = [
  {
    value: {
      sortBy: SortBy.Price,
      sortType: SortType.Ascending,
    },
    text_key: 'views.home.sort.fromLowestPrice',
  },
  {
    value: {
      sortBy: SortBy.Price,
      sortType: SortType.Descending,
    },
    text_key: 'views.home.sort.fromHighestPrice',
  },
  {
    value: {
      sortBy: SortBy.Duration,
      sortType: 1,
    },
    text_key: 'views.home.sort.fromShortestDuration',
  },
  {
    value: {
      sortBy: SortBy.Duration,
      sortType: SortType.Descending,
    },
    text_key: 'views.home.sort.fromLongestDuration',
  },
  {
    value: {
      sortBy: SortBy.Quality,
      sortType: 1,
    },
    text_key: 'views.home.sort.fromLowestQuality',
  },
  {
    value: {
      sortBy: SortBy.Quality,
      sortType: SortType.Descending,
    },
    text_key: 'views.home.sort.fromHighestQuality',
  },
];
