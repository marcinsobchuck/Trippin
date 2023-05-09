import React, { useState } from 'react';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { FormHero } from 'src/components/FormHero/FormHero';
import { useAuth } from 'src/hooks/useAuth';
import { Button } from 'src/styles/Button.styled';

import {
  FormWrapper,
  StyledForm,
  Title,
} from '../Entry/components/AuthenticationForm/AuthenticationForm.styled';

import {
  ErrorMesage,
  Information,
  InputContainer,
  StyledAuthFormInput,
  StyledButton,
  Wrapper,
} from './ForgottenPassword.styled';

export const ForgottenPassword: React.FC = () => {
  const [succesMsg, setSuccesMsg] = useState<string | null>();
  const [error, setError] = useState<string | null>();

  const { resetPassword } = useAuth();
  const history = useHistory();
  const handleGoBack = () => history.goBack();

  const { t } = useTranslation();

  return (
    <>
      <FormHero />
      <Wrapper>
        <FormWrapper>
          <Formik
            initialValues={{ email: '' }}
            onSubmit={({ email }, { resetForm }) => {
              resetPassword(email)
                .then(() => {
                  setError(null);
                  setSuccesMsg(`E-mail with a reset link has been sent to ${email}.`);
                })
                .catch(() => {
                  setSuccesMsg(null);
                  setError(`There is no account connected to ${email}.`);
                });

              resetForm();
            }}
          >
            {({ dirty }) => (
              <StyledForm>
                <Title>{t('views.forgottenPassword.labels.reset')}</Title>
                <InputContainer>
                  <StyledAuthFormInput
                    label={t('views.forgottenPassword.labels.email')}
                    name="email"
                    placeholder={t('views.forgottenPassword.placeholders.email')}
                    type="email"
                  />
                  {succesMsg && <Information>{succesMsg}</Information>}
                  {error && <ErrorMesage>{error}</ErrorMesage>}
                </InputContainer>

                <Button variant="primary" width={200} type="submit" disabled={!dirty}>
                  {t('views.forgottenPassword.buttons.reset')}
                </Button>
                <StyledButton variant="secondary" width={160} type="button" onClick={handleGoBack}>
                  {t('views.forgottenPassword.buttons.goBack')}
                </StyledButton>
              </StyledForm>
            )}
          </Formik>
        </FormWrapper>
      </Wrapper>
    </>
  );
};
