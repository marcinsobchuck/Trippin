import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { AuthContextType, RegionalSettingsTypes } from "./AuthContext.types";
import usaFlag from "src/assets/images/usaFlag.png";
import dollar from "src/assets/images/dollar.png";

export const AuthContext = React.createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFirstEntry, setIsFirstEntry] = useLocalStorage("firstEntry", true);
  const [regionalSettings, setRegionalSettings] =
    useLocalStorage<RegionalSettingsTypes>("regionalSettings", {
      language: {
        language: "English",
        languageCode: "en",
        flag: usaFlag,
      },
      currency: {
        currency: "U.S. Dollar",
        currencyCode: "USD",
        currencyIcon: dollar,
      },
    });

  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  const updateMail = (email: string) =>
    updateEmail(auth.currentUser as User, email);

  const updatePass = (password: string) =>
    updatePassword(auth.currentUser as User, password);

  useEffect(() => {
    currentUser && setIsFirstEntry(false);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    updateMail,
    updatePass,
    setIsFirstEntry,
    isFirstEntry,
    regionalSettings,
    setRegionalSettings,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
