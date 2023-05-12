import { FormikProps } from 'formik';

import { RecommendedPlace, SearchFormTypes } from 'src/views/Home/types/types';

export interface SearchFormProps {
  formRef: React.Ref<FormikProps<SearchFormTypes>>;
  currentRecommendedPlace: RecommendedPlace;
}
