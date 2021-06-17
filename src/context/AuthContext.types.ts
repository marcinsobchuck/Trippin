import firebase from "firebase/app";

export interface AuthContextType {
  currentUser: firebase.User | null;
  login: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  signUp: (
    email: string,
    password: string
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void> | undefined;
  updatePassword: (password: string) => Promise<void> | undefined;
  setIsFirstEntry: React.Dispatch<React.SetStateAction<boolean>>;
  isFirstEntry: boolean;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleToggleVisibility: () => void;
}
