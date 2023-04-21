import { CabinClass, CabinCode } from 'src/shared/types';

interface Cabin {
  value: CabinCode;
  text: CabinClass;
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
