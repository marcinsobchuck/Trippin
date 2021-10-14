import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import { auth } from "../firebase";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContextType } from "./AuthContext.types";

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFirstEntry, setIsFirstEntry] = useLocalStorage("firstEntry", true);

  const signUp = (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password);
  const logout = () => auth.signOut();

  const resetPassword = (email: string) => auth.sendPasswordResetEmail(email);

  const updateEmail = (email: string) => currentUser?.updateEmail(email);

  const updatePassword = (password: string) =>
    currentUser?.updatePassword(password);

  useEffect(() => {
    currentUser && setIsFirstEntry(false);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [currentUser, setIsFirstEntry]);

  const value = {
    currentUser,
    login,
    signUp,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    setIsFirstEntry,
    isFirstEntry,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
