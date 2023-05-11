import { FieldHookConfig, FormikErrors } from 'formik';

import { Date } from 'src/shared/types';

interface Props {
  error?: FormikErrors<Date>;
}

export type SearchFormDatePickerProps = Props & FieldHookConfig<Date>;
