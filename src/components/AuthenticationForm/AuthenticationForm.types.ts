import firebase from "firebase/app";

export interface AuthenticationFormProps {
  onSubmit: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  buttonText: string;
  title: string;
  isRegisterForm?: boolean;
}

export interface AuthValues {
  email: string;
  password: string;
  passwordConfirmation?: string;
}
