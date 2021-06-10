import React from "react";

import { Formik, Form } from "formik";
import { AuthFormInput } from "../AuthenticationFormInput/AuthFormInput";

interface AuthenticationFormProps {
  onSubmit: (email: string, password: string) => void;
  buttonText: string;
}

interface AuthValues {
  email: string;
  password: string;
}

const initialValues: AuthValues = {
  email: "",
  password: "",
};

export const AuthenticationForm: React.FC<AuthenticationFormProps> = ({
  onSubmit,
  buttonText,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values.email, values.password);
        resetForm();
      }}
    >
      <Form>
        <AuthFormInput name="email" label="e-mail" placeholder="e-mail" />
        <AuthFormInput
          name="password"
          label="password"
          placeholder="password"
        />
        <button type="submit">{buttonText}</button>
      </Form>
    </Formik>
  );
};
