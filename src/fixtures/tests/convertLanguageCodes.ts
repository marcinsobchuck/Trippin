import { Country, Location } from 'src/apiServices/types/kiwiApi.types';
import { Locations } from 'src/enums/locations.enum';

import { testLocationAirport, testLocationCity, testLocationCountry } from '../common/common';

export const testUnpopularLocationCountry: Country = {
  id: '1',
  name: 'Swaziland',
  type: Locations.Country,
};

export const testLocationsOne: Location[] = [testLocationAirport, testLocationCity, testLocationCountry];

export const testLocationsTwo: Location[] = [
  testUnpopularLocationCountry,
  testLocationAirport,
  testLocationCity,
  testLocationCountry,
];
