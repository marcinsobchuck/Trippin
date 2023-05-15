import airplaneIcon from 'src/assets/images/airplane.svg';
import cityIcon from 'src/assets/images/city.svg';
import countryIcon from 'src/assets/images/country.svg';

import { FlagsResponse } from 'src/apiServices/types/flagsApi.types';
import { Location } from 'src/apiServices/types/kiwiApi.types';
import { Locations } from 'src/enums/locations.enum';

export const convertLanguageCodes = (code: 'pl' | 'en') => {
  if (code === 'pl') {
    return 'pl-PL';
  }
  return 'en-EN';
};

export const getLocationParameters = (location: Location) => {
  switch (location.type) {
    case Locations.Airport:
      return { name: location.city.country.name, icon: airplaneIcon };
    case Locations.City:
      return {
        name: location.country.name,
        icon: cityIcon,
      };
    case Locations.Country:
      return {
        name: location.name,
        icon: countryIcon,
      };
    default:
      return {
        name: '',
        icon: '',
      };
  }
};

export const getCurrentCodes = (locations: Location[], codes: FlagsResponse) => {
  const currentCountriesArray = locations.map((location) => getLocationParameters(location).name);
  const countriesData = Object.entries(codes);
  const countries = Object.values(codes);

  const currentCodes: (string | undefined)[] = [];
  currentCountriesArray.forEach((el, index) => {
    if (!countries.includes(el)) {
      currentCodes[index] = undefined;
    }
    countriesData.forEach((item) => {
      if (item[1] === el) {
        currentCodes.push(item[0]);
      }
    });
  });

  return currentCodes;
};
