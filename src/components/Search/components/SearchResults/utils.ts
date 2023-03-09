import moment from "moment";
import { Flight } from "src/apiServices/types/kiwiApi.types";
import { db } from "src/firebase";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export const formatDateToLocalTime = (date: number) =>
  moment.unix(date).local().format("HH:mm");

export const formatDateToLocalDate = (date: number) =>
  moment.unix(date).local().format("DD.MM.YY");

export const getDateDifference = (past: number, future: number) => {
  const departureDate = moment.unix(past);
  const arrivalDate = moment.unix(future);

  const differenceMS = arrivalDate.diff(departureDate);
  const hours = Math.trunc(moment.duration(differenceMS).asHours());
  const minutes = moment.duration(differenceMS).minutes();

  const result = `${hours}h  ${minutes}min`;

  return result;
};

export const addFavourites = async (user: User | null, item: Flight) => {
  if (!user) return;

  const docRef = doc(db, `users/${user.uid}/favourites`, item.id);

  console.log(docRef);

  try {
    await setDoc(
      docRef,
      {
        id: item.id,
        from: item.cityFrom,
        to: item.cityTo,
        price: item.price,
      },
      { merge: true }
    );
  } catch (err) {
    console.log(err);
  }
};

export const deleteFavourites = async (user: User | null, item: Flight) => {
  if (!user) return;

  const docRef = doc(db, `users/${user.uid}/favourites`, item.id);

  console.log(docRef);

  try {
    await deleteDoc(docRef);
  } catch (err) {
    console.log(err);
  }
};
