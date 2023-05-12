import { initializeApp } from 'firebase/app';
import { User, getAuth } from 'firebase/auth';
import { deleteDoc, doc, getFirestore, setDoc } from 'firebase/firestore';

import { Flight } from 'src/apiServices/types/kiwiApi.types';

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

export const addFavourites = async (user: User | null, item: Flight, currency: string) => {
  if (!user) return;

  const docRef = doc(db, `users/${user.uid}/favourites`, item.id);

  try {
    await setDoc(docRef, { ...item, currency }, { merge: true });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFavourites = async (user: User | null, itemId: string) => {
  if (!user) return;

  const docRef = doc(db, `users/${user.uid}/favourites`, itemId);

  try {
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
};
