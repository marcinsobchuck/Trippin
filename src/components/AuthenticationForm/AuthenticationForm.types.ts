export interface AuthenticationFormProps {
  onSubmit: (email: string, password: string) => void;
  buttonText: string;
  isRegisterForm?: boolean;
}

export interface AuthValues {
  email: string;
  password: string;
  passwordConfirmation?: string;
}
