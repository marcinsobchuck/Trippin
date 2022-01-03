import { FieldHookConfig } from "formik";

export interface Props {
  label: string;
  placeholder: string;
  type: "text" | "radio";
  className?: string;
  isDestination?: boolean;
}

export type SearchFormInputProps = Props & FieldHookConfig<string>;
