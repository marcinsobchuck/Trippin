import { FormikProps } from 'formik';

import { RecommendedPlace, SearchFormTypes } from 'src/shared/types';

export interface SearchFormProps {
  formRef: React.Ref<FormikProps<SearchFormTypes>>;
  currentRecommendedPlace: RecommendedPlace;
}
