import React, { useState } from "react";

import { Formik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import {
  StyledForm,
  Title,
  FormWrapper,
} from "../../components/AuthenticationForm/AuthenticationForm.styled";
import { FormHero } from "../../components/FormHero/FormHero";
import { useHistory } from "react-router-dom";
import {
  ErrorMesage,
  Information,
  InputContainer,
  StyledAuthFormInput,
  StyledButton,
  Wrapper,
} from "./ForgottenPassword.styled";
import { Button } from "../../styles/Button.styled";

export const ForgottenPassword: React.FC = () => {
  const [succesMsg, setSuccesMsg] = useState<string | null>();
  const [error, setError] = useState<string | null>();

  const { resetPassword } = useAuth();
  const history = useHistory();
  const handleGoBack = () => history.goBack();

  return (
    <>
      <FormHero />
      <Wrapper>
        <FormWrapper>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={({ email }, { resetForm }) => {
              resetPassword(email)
                .then(() => {
                  setError(null);
                  setSuccesMsg(
                    `E-mail with a reset link has been sent to ${email}.`
                  );
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
                <Title>Reset password</Title>
                <InputContainer>
                  <StyledAuthFormInput
                    label="E-mail"
                    name="email"
                    placeholder="Type your e-mail here"
                    type="email"
                  />
                  {succesMsg && <Information>{succesMsg}</Information>}
                  {error && <ErrorMesage>{error}</ErrorMesage>}
                </InputContainer>

                <Button
                  variant="primary"
                  width={200}
                  type="submit"
                  disabled={!dirty}
                >
                  Reset password
                </Button>
                <StyledButton
                  variant="secondary"
                  width={160}
                  type="button"
                  onClick={handleGoBack}
                >
                  Go back
                </StyledButton>
              </StyledForm>
            )}
          </Formik>
        </FormWrapper>
      </Wrapper>
    </>
  );
};
