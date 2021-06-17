import React from "react";

import { useField } from "formik";
import { AuthFormInputProps } from "./AuthFormInput.types";
import {
  StyledInput,
  StyledLabel,
  Wrapper,
  ErrorSpace,
  ErrorStyled,
} from "./AuthFormInput.styled";

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  placeholder,
  type,
  className,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <Wrapper className={className}>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput
        {...field}
        type={type}
        id={label}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <ErrorStyled>{meta.error}</ErrorStyled>
      ) : (
        <ErrorSpace>error</ErrorSpace>
      )}
    </Wrapper>
  );
};
