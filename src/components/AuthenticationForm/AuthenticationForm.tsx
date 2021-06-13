import React from "react";

import { Formik, Form } from "formik";
import { AuthFormInput } from "../AuthenticationFormInput/AuthFormInput";
import { validationSchema } from "./validationSchema";
import {
  AuthenticationFormProps,
  AuthValues,
} from "./AuthenticationForm.types";

const initialValues: AuthValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
};

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  onSubmit,
  buttonText,
  isRegisterForm,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.email, values.password);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      <Form>
        <AuthFormInput name="email" label="e-mail" placeholder="e-mail" />
        <AuthFormInput
          name="password"
          label="password"
          placeholder="password"
        />
        {isRegisterForm && (
          <AuthFormInput
            name="passwordConfirmation"
            label="Password confirmation"
            placeholder="Password confirmation"
          />
        )}
        <button type="submit">{buttonText}</button>
      </Form>
    </Formik>
  );
};
