import React, { useEffect } from "react";

import { Formik, Form } from "formik";
import { AuthFormInput } from "./AuthFormInput";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router";
import { Routes } from "../enums/routes.enum";

interface AuthenticationFormProps {
  onSubmit: (email: string, password: string) => void;
  buttonText: string;
}

export interface AuthValues {
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
  const { currentUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (currentUser) history.push(Routes.Home);
  }, [currentUser, history]);

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
