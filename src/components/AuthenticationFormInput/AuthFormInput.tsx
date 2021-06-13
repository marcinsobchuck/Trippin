import React from "react";

import { useField } from "formik";
import { AuthFormInputProps } from "./AuthFormInput.types";

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  placeholder,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor="">{label}</label>
      <input {...field} id={label} type="text" placeholder={placeholder} />
      {meta.touched && meta.error ? <span>{meta.error}</span> : null}
    </>
  );
};
