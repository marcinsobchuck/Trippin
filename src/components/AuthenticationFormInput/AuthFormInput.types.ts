import { FieldHookConfig } from "formik";

export interface Props {
  label: string;
  placeholder: string;
}

export type AuthFormInputProps = Props & FieldHookConfig<string>;
