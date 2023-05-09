import React, { useState } from 'react';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { TailSpin } from 'react-loader-spinner';
import { useHistory } from 'react-router-dom';

import { AuthFormInput } from 'src/components/AuthenticationFormInput/AuthFormInput';
import { Colors } from 'src/enums/colors.enum';
import { Routes } from 'src/enums/routes.enum';
import { useAuth } from 'src/hooks/useAuth';
import { Button, RedirectButton } from 'src/styles/Button.styled';

import {
  ActionText,
  ButtonsWrapper,
  Error,
  StyledButton,
  StyledForm,
  StyledRedirectButton,
  Title,
} from './AuthenticationForm.styled';
import { AuthenticationFormProps } from './AuthenticationForm.types';
import { initialValues } from './config';
import { loginValidationSchema, registerValidationSchema } from './validationSchema';

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

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ email, password }) => {
        await onSubmit(email, password)
          .then(() => history.push('/'))
          .catch(() => setError(t('views.entry.errors.userNotFound')));
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting }) => (
        <StyledForm>
          <Title>{title}</Title>
          <AuthFormInput
            type="email"
            name="email"
            label={t('views.entry.labels.email')}
            placeholder={t('views.entry.placeholders.email')}
          />
          <AuthFormInput
            name="password"
            label={t('views.entry.labels.password')}
            placeholder={t('views.entry.placeholders.password')}
            type="password"
          />
          {error && <Error>{error}</Error>}
          {isRegisterForm && (
            <AuthFormInput
              name="passwordConfirmation"
              label={t('views.entry.labels.passwordConfirmation')}
              placeholder={t('views.entry.placeholders.passwordConfirmation')}
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
            <span>{t('views.entry.text.or')}</span>
            <RedirectButton variant="secondary" width={200} to={Routes.Home} onClick={continueAsGuest}>
              {t('views.entry.buttons.guest')}
            </RedirectButton>
          </ButtonsWrapper>
          {isRegisterForm ? (
            <ActionText>
              {t('views.entry.text.alreadyRegistered')}
              <StyledButton type="button" variant="tertiary" onClick={handleToggleMobileAnimation}>
                {t('views.entry.buttons.login')}
              </StyledButton>
            </ActionText>
          ) : (
            <>
              <ActionText>
                {t('views.entry.text.notRegistered')}
                <StyledButton type="button" variant="tertiary" onClick={handleToggleMobileAnimation}>
                  {t('views.entry.buttons.createAcc')}
                </StyledButton>
              </ActionText>
              <StyledRedirectButton variant="tertiary" to={Routes.ForgottenPassword}>
                {t('views.entry.buttons.forgot')}
              </StyledRedirectButton>
            </>
          )}
        </StyledForm>
      )}
    </Formik>
  );
};
