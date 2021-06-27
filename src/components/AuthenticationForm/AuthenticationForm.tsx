import React, { useState } from "react";

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
import {
  StyledForm,
  Title,
  ActionText,
  ButtonsWrapper,
  StyledButton,
  StyledRedirectButton,
  Error,
} from "./AuthenticationForm.styled";
import { Button, RedirectButton } from "../../styles/Button.styled";
import { useAuth } from "../../hooks/useAuth";
import { Routes } from "../../enums/routes.enum";
import Loader from "react-loader-spinner";
import { Colors } from "../../enums/colors.enum";

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
  const { setIsFirstEntry, handleToggleVisibility } = useAuth();
  const [error, setError] = useState<string>();

  const continueAsGuest = () => setIsFirstEntry(false);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ email, password }, { resetForm, setSubmitting }) => {
        setSubmitting(true);
        await onSubmit(email, password).catch((error) =>
          setError(error.message)
        );
        setSubmitting(false);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
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
          {error && <Error>{error}</Error>}
          {isRegisterForm && (
            <AuthFormInput
              name="passwordConfirmation"
              label="Password confirmation"
              placeholder="Password confirmation"
              type="password"
            />
          )}
          <ButtonsWrapper>
            <Button width={200} variant="primary" type="submit">
              {isSubmitting ? (
                <Loader
                  type="TailSpin"
                  color={Colors.White}
                  width={16}
                  height={16}
                />
              ) : (
                buttonText
              )}
            </Button>
            <span>or</span>
            <RedirectButton
              variant="secondary"
              width={200}
              to={Routes.Home}
              onClick={continueAsGuest}
            >
              Continue as a guest
            </RedirectButton>
          </ButtonsWrapper>
          {isRegisterForm ? (
            <ActionText>
              Already registered?
              <StyledButton
                type="button"
                variant="tertiary"
                onClick={handleToggleVisibility}
              >
                Log in
              </StyledButton>
            </ActionText>
          ) : (
            <>
              <ActionText>
                Not registered yet?
                <StyledButton
                  type="button"
                  variant="tertiary"
                  onClick={handleToggleVisibility}
                >
                  Create an account
                </StyledButton>
              </ActionText>
              <StyledRedirectButton
                variant="tertiary"
                to={Routes.ForgottenPassword}
              >
                Forgot password?
              </StyledRedirectButton>
            </>
          )}
        </StyledForm>
      )}
    </Formik>
  );
};
