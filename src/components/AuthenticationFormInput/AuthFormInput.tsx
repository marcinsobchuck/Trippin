import React from 'react';

import { useField } from 'formik';

import { ErrorSpace, ErrorStyled, StyledInput, StyledLabel, Wrapper } from './AuthFormInput.styled';
import { AuthFormInputProps } from './AuthFormInput.types';

export const AuthFormInput: React.FC<AuthFormInputProps> = ({
  label,
  placeholder,
  type,
  className,
  testId,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <Wrapper className={className}>
      <StyledLabel htmlFor={label}>{label}</StyledLabel>
      <StyledInput {...field} type={type} id={label} placeholder={placeholder} data-testid={testId} />
      {meta.touched && meta.error ? <ErrorStyled>{meta.error}</ErrorStyled> : <ErrorSpace>error</ErrorSpace>}
    </Wrapper>
  );
};
