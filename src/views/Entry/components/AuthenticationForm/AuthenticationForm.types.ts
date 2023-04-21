import { UserCredential } from 'firebase/auth';

export interface AuthenticationFormProps {
  onSubmit: (email: string, password: string) => Promise<UserCredential>;
  buttonText: string;
  title: string;
  handleToggleMobileAnimation?: () => void;
  isRegisterForm?: boolean;
}

export interface AuthValues {
  email: string;
  password: string;
  passwordConfirmation?: string;
}
