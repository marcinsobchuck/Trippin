import { FieldHookConfig } from 'formik';

export interface Props {
  label: string;
  placeholder: string;
  className?: string;
  type: 'text' | 'password' | 'email';
  testId?: string;
}

export type AuthFormInputProps = Props & FieldHookConfig<string>;
