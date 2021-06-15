import React from "react";

import { Formik } from "formik";
import { AuthFormInput } from "../AuthenticationFormInput/AuthFormInput";
import {
  registerValidationSchema,
  loginValidationSchema,
} from "./validationSchema";
import {
  AuthenticationFormProps,
  AuthValues,
} from "./AuthenticationForm.types";
import { FormHero } from "../FormHero/FormHero";
import {
  Wrapper,
  FormWrapper,
  StyledForm,
  Title,
} from "./AuthenticationForm.styled";
import { useAuth } from "../../hooks/useAuth";
import { useHistory, Link } from "react-router-dom";
import { Routes } from "../../enums/routes.enum";

const initialValues: AuthValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  onSubmit,
  buttonText,
  title,
  isRegisterForm,
}) => {
  const validationSchema = isRegisterForm
    ? registerValidationSchema
    : loginValidationSchema;
  const { setIsFirstEntry } = useAuth();
  const history = useHistory();

  const continueAsGuest = () => {
    setIsFirstEntry(false);
    history.push(Routes.Home);
  };
  return (
    <Wrapper>
      <FormHero />
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={({ email, password }, { resetForm }) => {
            onSubmit(email, password);
            resetForm();
          }}
          validationSchema={validationSchema}
        >
          <StyledForm>
            <Title>{title}</Title>
            <AuthFormInput
              type="email"
              name="email"
              label="E-mail"
              placeholder="Type your e-mail here"
            />
            <AuthFormInput
              name="password"
              label="Password"
              placeholder="Type your password here"
              type="password"
            />
            {isRegisterForm && (
              <AuthFormInput
                name="passwordConfirmation"
                label="Password confirmation"
                placeholder="Password confirmation"
                type="password"
              />
            )}
            <Link to={Routes.ForgottenPassword}>Forgot password</Link>
            <button type="submit">{buttonText}</button>
          </StyledForm>
        </Formik>
        <button onClick={continueAsGuest}>Continue as a guest</button>
      </FormWrapper>
    </Wrapper>
  );
};
