import { SpringValue } from 'react-spring';

import { FavouriteFlight } from 'src/hooks/useFavourites';

export interface FavouriteTripProps {
  flight: FavouriteFlight;
  onDelete: (id: string) => void;
  style: {
    transform: SpringValue<string>;
    opacity: SpringValue<number>;
    height: SpringValue<number>;
  };
}
