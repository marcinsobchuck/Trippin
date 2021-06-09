import React from "react";
import { AuthenticationForm } from "../../components/AuthenticationForm";
import { useAuth } from "../../context/AuthContext";

export const Entry = () => {
  const { signUp, login } = useAuth();

  return (
    <div>
      <div>Login Form</div>
      <AuthenticationForm buttonText="Login" onSubmit={login} />
      <div>Sign-up Form</div>
      <AuthenticationForm buttonText="Sign-up" onSubmit={signUp} />
    </div>
  );
};
