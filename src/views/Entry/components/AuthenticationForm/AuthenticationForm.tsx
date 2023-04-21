import React, { useState } from 'react';

import { Formik } from 'formik';
import { TailSpin } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import { Colors } from 'src/enums/colors.enum';
import { Routes } from 'src/enums/routes.enum';
import { useAuth } from 'src/hooks/useAuth';
import { Button, RedirectButton } from 'src/styles/Button.styled';

import { AuthFormInput } from '../../../../components/AuthenticationFormInput/AuthFormInput';

import {
  ActionText,
  ButtonsWrapper,
  Error,
  StyledButton,
  StyledForm,
  StyledRedirectButton,
  Title,
} from './AuthenticationForm.styled';
import { AuthValues, AuthenticationFormProps } from './AuthenticationForm.types';
import { loginValidationSchema, registerValidationSchema } from './validationSchema';

const initialValues: AuthValues = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  onSubmit,
  buttonText,
  title,
  isRegisterForm,
  handleToggleMobileAnimation,
}) => {
  const [error, setError] = useState<string>();

  const { setIsFirstEntry } = useAuth();

  const continueAsGuest = () => setIsFirstEntry(false);

  const validationSchema = isRegisterForm ? registerValidationSchema : loginValidationSchema;

  const history = useHistory();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ email, password }) => {
        await onSubmit(email, password)
          .then(() => history.push('/'))
          .catch(() => setError('User not found'));
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
                <TailSpin
                  color={Colors.Gray}
                  width={16}
                  height={16}
                  wrapperStyle={{
                    justifyContent: 'center',
                  }}
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
              <StyledButton type="button" variant="tertiary" onClick={handleToggleMobileAnimation}>
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
                  onClick={handleToggleMobileAnimation}
                >
                  Create an account
                </StyledButton>
              </ActionText>
              <StyledRedirectButton variant="tertiary" to={Routes.ForgottenPassword}>
                Forgot password?
              </StyledRedirectButton>
            </>
          )}
        </StyledForm>
      )}
    </Formik>
  );
};
