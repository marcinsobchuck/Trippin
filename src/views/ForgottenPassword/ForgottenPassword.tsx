import React from 'react';

import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { FormHero } from 'src/components/FormHero/FormHero';
import { useAuth } from 'src/hooks/useAuth';
import { Button } from 'src/styles/Button.styled';
import { PromiseToastContainer } from 'src/styles/Toast.styled';

import {
  FormWrapper,
  StyledForm,
  Title,
} from '../Entry/components/AuthenticationForm/AuthenticationForm.styled';

import {
  ErrorSpace,
  ErrorStyled,
  InputContainer,
  StyledAuthFormInput,
  StyledButton,
  Wrapper,
} from './ForgottenPassword.styled';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('views.forgottenPassword.errors.emailValid')
    .required('views.forgottenPassword.errors.emptyField'),
});

export const ForgottenPassword: React.FC = () => {
  const { resetPassword } = useAuth();
  const history = useHistory();
  const handleGoBack = () => history.goBack();

  const { t } = useTranslation();

  return (
    <>
      <FormHero />
      <Wrapper>
        <PromiseToastContainer />
        <FormWrapper>
          <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={({ email }, { resetForm }) => {
              toast.promise(resetPassword(email), {
                error: `${t('views.forgottenPassword.errors.failedToReset')} ${email}`,
                pending: t('views.forgottenPassword.pending.pending'),
                success: `${t('views.forgottenPassword.success.success')} ${email}`,
              });
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <StyledForm>
                <Title>{t('views.forgottenPassword.labels.reset')}</Title>
                <InputContainer>
                  <StyledAuthFormInput
                    label={t('views.forgottenPassword.labels.email')}
                    name="email"
                    placeholder={t('views.forgottenPassword.placeholders.email')}
                    type="email"
                  />
                  {errors.email && touched.email ? (
                    <ErrorStyled>{t(errors.email)}</ErrorStyled>
                  ) : (
                    <ErrorSpace>Error</ErrorSpace>
                  )}
                </InputContainer>

                <Button variant="primary" width={200} type="submit">
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
