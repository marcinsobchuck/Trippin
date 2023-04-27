import { CabinCode } from 'src/shared/types';

export const getTextFromValue = (value: CabinCode) => {
  switch (value) {
    case 'M':
      return 'Economy';
    case 'W':
      return 'Economy premium';
    case 'C':
      return 'Business';
    case 'F':
      return 'First class';
    default:
      return 'Economy';
  }
};
