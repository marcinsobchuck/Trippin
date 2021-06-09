import React, { useContext, useState, useEffect } from "react";
import firebase from "firebase/app";

import { auth } from "../firebase";
import { Routes } from "../enums/routes.enum";

interface AuthContextType {
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
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

// custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used inside of AuthContext.Provider");
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => auth.signOut();

  const resetPassword = (email: string) => auth.sendPasswordResetEmail(email);

  const updateEmail = (email: string) => currentUser?.updateEmail(email);

  const updatePassword = (password: string) =>
    currentUser?.updatePassword(password);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);

      return unsubscribe;
    });
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
