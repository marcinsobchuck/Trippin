import { User } from 'firebase/auth';
import { deleteDoc,doc, setDoc } from 'firebase/firestore';
import moment from 'moment';

import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { db } from 'src/firebase';

export const formatTime = (date: number) => moment.unix(date).utcOffset(0).format('HH:mm');

export const formatDate = (date: number) => moment.unix(date).utcOffset(0).format('DD.MM.YY');

export const getDateDifference = (past: number, future: number) => {
  const departureDate = moment.unix(past);
  const arrivalDate = moment.unix(future);

  const differenceMS = arrivalDate.diff(departureDate);
  const hours = Math.trunc(moment.duration(differenceMS).asHours());
  const minutes = moment.duration(differenceMS).minutes();

  const result = `${hours}h  ${minutes}min`;

  return result;
};

export const addFavourites = async (
  user: User | null,
  item: Flight,
  currency: string,
) => {
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
