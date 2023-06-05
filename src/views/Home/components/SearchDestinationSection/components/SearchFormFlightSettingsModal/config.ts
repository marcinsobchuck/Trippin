import adult from 'src/assets/images/adult.svg';
import child from 'src/assets/images/child.svg';
import infant from 'src/assets/images/infant.svg';

import { CabinCode } from 'src/apiServices/types/kiwiApi.types';
import { Passengers } from 'src/views/Home/reducer/types/searchReducer.types';

interface Cabin {
  value: CabinCode;
  cabin_key: string;
}

interface SteppersDataType {
  icon: string;
  stepper_key: string;
  underText: string;
  ageRestriction: number | null;
  type: keyof Passengers;
  minValue: number;
  maxValue: number;
  testIncrementId: string;
}

export const cabinClassArray: Cabin[] = [
  {
    value: 'M',
    cabin_key: 'views.home.flightSettings.economy',
  },
  {
    value: 'W',
    cabin_key: 'views.home.flightSettings.economyPremium',
  },
  {
    value: 'C',
    cabin_key: 'views.home.flightSettings.business',
  },
  {
    value: 'F',
    cabin_key: 'views.home.flightSettings.firstClass',
  },
];

export const steppersData: SteppersDataType[] = [
  {
    icon: adult,
    stepper_key: 'views.home.flightSettings.adults',
    underText: 'views.home.flightSettings.over',
    ageRestriction: 11,
    type: 'adults',
    minValue: 1,
    maxValue: 9,
    testIncrementId: 'add-adult',
  },
  {
    icon: child,
    stepper_key: 'views.home.flightSettings.children',
    underText: '2-11',
    ageRestriction: null,
    type: 'children',
    minValue: 0,
    maxValue: 8,
    testIncrementId: 'add-child',
  },
  {
    icon: infant,
    stepper_key: 'views.home.flightSettings.infants',
    underText: 'views.home.flightSettings.under',
    ageRestriction: 2,
    type: 'infants',
    minValue: 0,
    maxValue: 1,
    testIncrementId: 'add-infant',
  },
];
