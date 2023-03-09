import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { db } from "src/firebase";

export interface FavouriteFlight {
  id: string;
  from: string;
  to: string;
  price: number;
}

export const useFavourites = (user: User | null) => {
  const [data, setData] = useState<FavouriteFlight[]>([]);

  const getData = useCallback(async () => {
    const favourites: FavouriteFlight[] = [];

    try {
      const querySnapshot = await getDocs(
        collection(db, `/users/${user?.uid}/favourites`)
      );
      querySnapshot.forEach((doc) => {
        favourites.push(doc.data() as FavouriteFlight);
      });
    } catch (err) {
      console.log(err);
    }

    setData(favourites);
  }, [user?.uid]);

  useEffect(() => {
    getData();
  }, [getData]);

  return data;
};
