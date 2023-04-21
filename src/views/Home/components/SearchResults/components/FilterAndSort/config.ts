import { Option } from './FilterAndSort.types';

export const options: Option[] = [
  {
    value: {
      sortBy: 'price',
      sortType: 1,
    },
    text: 'Price: from lowest',
  },
  {
    value: {
      sortBy: 'price',
      sortType: 0,
    },
    text: 'Price: from highest',
  },
  {
    value: {
      sortBy: 'duration',
      sortType: 1,
    },
    text: 'Duration: from shortest',
  },
  {
    value: {
      sortBy: 'duration',
      sortType: 0,
    },
    text: 'Duration: from longest',
  },
  {
    value: {
      sortBy: 'quality',
      sortType: 1,
    },
    text: 'Quality: from highest',
  },
  {
    value: {
      sortBy: 'quality',
      sortType: 0,
    },
    text: 'Quality: from lowest',
  },
];
