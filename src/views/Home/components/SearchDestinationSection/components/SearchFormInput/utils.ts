import airplaneIcon from 'src/assets/images/airplane.svg';
import cityIcon from 'src/assets/images/city.svg';
import countryIcon from 'src/assets/images/country.svg';

import { Location } from 'src/apiServices/types/kiwiApi.types';
import { LocationsType } from 'src/enums/locationsType.enum';

export const convertLanguageCodes = (code: 'pl' | 'en') => {
  switch (code) {
    case 'en':
      return 'en-EN';
    case 'pl':
      return 'pl-PL';
    default:
      return 'en-EN';
  }
};

export const getLocationParameters = (location: Location) => {
  switch (location.type) {
    case LocationsType.Airport:
      if (location.hasOwnProperty('country') && location.hasOwnProperty('city')) {
        return {
          name: location.country?.name,
          icon: airplaneIcon,
        };
      }
      return { name: location.city?.country.name, icon: airplaneIcon };
    case LocationsType.City:
      return {
        name: location.country?.name,
        icon: cityIcon,
      };
    case LocationsType.Country:
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
