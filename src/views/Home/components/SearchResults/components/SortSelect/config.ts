import { Option } from '../FilterAndSort/FilterAndSort.types';

export const options: Option[] = [
  {
    value: {
      sortBy: 'price',
      sortType: 1,
    },
    text_key: 'views.home.sort.fromLowestPrice',
  },
  {
    value: {
      sortBy: 'price',
      sortType: 0,
    },
    text_key: 'views.home.sort.fromHighestPrice',
  },
  {
    value: {
      sortBy: 'duration',
      sortType: 1,
    },
    text_key: 'views.home.sort.fromShortestDuration',
  },
  {
    value: {
      sortBy: 'duration',
      sortType: 0,
    },
    text_key: 'views.home.sort.fromLongestDuration',
  },
  {
    value: {
      sortBy: 'quality',
      sortType: 1,
    },
    text_key: 'views.home.sort.fromLowestQuality',
  },
  {
    value: {
      sortBy: 'quality',
      sortType: 0,
    },
    text_key: 'views.home.sort.fromHighestQuality',
  },
];
