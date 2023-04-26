import adult from 'src/assets/images/adult.svg';
import child from 'src/assets/images/child.svg';
import infant from 'src/assets/images/infant.svg';

import { CabinClass, CabinCode } from 'src/shared/types';
import { Passengers } from 'src/views/Home/reducer/types/searchReducer.types';

interface Cabin {
  value: CabinCode;
  text: CabinClass;
}

interface SteppersDataType {
  icon: string;
  title: string;
  underText: string;
  type: keyof Passengers;
  minValue: number;
  maxValue: number;
}

export const cabinClassArray: Cabin[] = [
  {
    value: 'M',
    text: 'Economy',
  },
  {
    value: 'W',
    text: 'Economy premium',
  },
  {
    value: 'C',
    text: 'Business',
  },
  {
    value: 'F',
    text: 'First class',
  },
];

export const steppersData: SteppersDataType[] = [
  {
    icon: adult,
    title: 'Adults',
    underText: 'Over 11',
    type: 'adults',
    minValue: 1,
    maxValue: 9,
  },
  {
    icon: child,
    title: 'Children',
    underText: '2-11',
    type: 'children',
    minValue: 0,
    maxValue: 8,
  },
  {
    icon: infant,
    title: 'Infants',
    underText: 'Under 2',
    type: 'infants',
    minValue: 0,
    maxValue: 1,
  },
];
