import React from "react";

import { FieldHookConfig, useField } from "formik";

interface Props {
  label: string;
  placeholder: string;
}

type AuthFormInputProps = Props & FieldHookConfig<string>;

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  placeholder,
  ...props
}) => {
  const [field] = useField(props);

  return (
    <>
      <label htmlFor="">{label}</label>
      <input {...field} id={label} type="text" placeholder={placeholder} />
    </>
  );
};
