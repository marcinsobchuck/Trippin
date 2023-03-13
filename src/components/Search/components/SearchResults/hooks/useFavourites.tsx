import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { db } from "src/firebase";

export interface FavouriteFlight {
  id: string;
  from: string;
  fromCountry: string;
  to: string;
  toCountry: string;
  price: number;
  depart: number;
  arrival: number;
  link: string;
}

export const useFavourites = (user: User | null) => {
  const [data, setData] = useState<FavouriteFlight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    const favourites: FavouriteFlight[] = [];
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, `/users/${user?.uid}/favourites`)
      );

      querySnapshot.forEach((doc) => {
        favourites.push(doc.data() as FavouriteFlight);
      });
      setData(favourites);
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [user?.uid]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading };
};
