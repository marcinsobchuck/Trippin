import { FieldHookConfig } from 'formik';

import { InputPlaceType, RecommendedPlace } from 'src/shared/types';

export interface Props {
  label: string;
  placeholder: string;
  type: 'text' | 'radio';
  className?: string;
  isDestination?: boolean;
  currentRecommendedPlace?: RecommendedPlace;
  error?: string;
}

export type SearchFormInputProps = Props & FieldHookConfig<InputPlaceType>;
