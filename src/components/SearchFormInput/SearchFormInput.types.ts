import { FieldHookConfig } from "formik";

export interface Props {
  label: string;
  placeholder: string;
  type: "text" | "radio";
  className?: string;
}

export type SearchFormInputProps = Props & FieldHookConfig<string>;
