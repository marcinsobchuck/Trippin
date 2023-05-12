import { FieldHookConfig, FormikErrors } from 'formik';

import { Date } from 'src/views/Home/types/types';

interface Props {
  error?: FormikErrors<Date>;
}

export type SearchFormDatePickerProps = Props & FieldHookConfig<Date>;
