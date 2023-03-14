import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { Flight } from "src/apiServices/types/kiwiApi.types";
import { db } from "src/firebase";

export const useFavourites = (user: User | null) => {
  const [data, setData] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    const favourites: Flight[] = [];
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(
        collection(db, `/users/${user?.uid}/favourites`)
      );

      querySnapshot.forEach((doc) => {
        favourites.push(doc.data() as Flight);
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
