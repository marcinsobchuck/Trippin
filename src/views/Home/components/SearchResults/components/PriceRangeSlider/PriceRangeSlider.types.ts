import { SearchParameters } from 'src/apiServices/types/kiwiApi.types';

export interface PriceRangeSliderProps {
  parameters: SearchParameters;
}

export interface Price {
  min: number;
  max: number;
}
