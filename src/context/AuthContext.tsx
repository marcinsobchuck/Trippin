import React, { useEffect, useMemo, useState } from 'react';

import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import dollar from 'src/assets/images/dollar.png';
import usaFlag from 'src/assets/images/usaFlag.png';

import { auth } from '../firebase';
import { useLocalStorage } from '../hooks/useLocalStorage';

import { AuthContextType, RegionalSettingsTypes } from './AuthContext.types';

export const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isFirstEntry, setIsFirstEntry] = useLocalStorage('firstEntry', true);
  const [regionalSettings, setRegionalSettings] = useLocalStorage<RegionalSettingsTypes>('regionalSettings', {
    language: {
      languageCode: 'en',
      flag: usaFlag,
      language_key: 'views.home.languages.english',
    },
    currency: {
      currency_key: 'views.home.currencies.dollar',
      currencyCode: 'USD',
      currencyIcon: dollar,
    },
  });

  const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

  const login = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);
  const logout = () => signOut(auth);

  const resetPassword = (email: string) => sendPasswordResetEmail(auth, email);

  useEffect(() => {
    if (currentUser) {
      setIsFirstEntry(false);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser, setIsFirstEntry]);

  const value = useMemo(
    () => ({
      currentUser,
      login,
      signUp,
      logout,
      resetPassword,
      setIsFirstEntry,
      isFirstEntry,
      regionalSettings,
      setRegionalSettings,
    }),
    [currentUser, isFirstEntry, regionalSettings, setIsFirstEntry, setRegionalSettings],
  );
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
