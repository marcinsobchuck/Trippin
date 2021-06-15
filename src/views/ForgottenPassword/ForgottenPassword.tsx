import React, { useState } from "react";

import { Formik } from "formik";
import { useAuth } from "../../hooks/useAuth";
import {
  StyledForm,
  Title,
  FormWrapper,
} from "../../components/AuthenticationForm/AuthenticationForm.styled";
import { AuthFormInput } from "../../components/AuthenticationFormInput/AuthFormInput";
import { FormHero } from "../../components/FormHero/FormHero";
import { useHistory } from "react-router-dom";
import {
  Information,
  InputContainer,
  StyledAuthFormInput,
  Wrapper,
} from "./ForgottenPassword.styled";

export const ForgottenPassword: React.FC = () => {
  const [succesMsg, setSuccesMsg] = useState<string | null>();
  const [error, setError] = useState<string | null>();

  const { resetPassword } = useAuth();
  const history = useHistory();
  const handleGoBack = () => history.goBack();

  return (
    <Wrapper>
      <FormHero />
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
              {error && <Information>{error}</Information>}
            </InputContainer>

            <button type="submit">Reset password</button>
            <button onClick={handleGoBack}>Go back</button>
          </StyledForm>
        </Formik>
      </FormWrapper>
    </Wrapper>
  );
};
