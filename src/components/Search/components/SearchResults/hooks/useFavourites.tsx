import { User } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useCallback } from "react";
import { Flight } from "src/apiServices/types/kiwiApi.types";
import { db } from "src/firebase";
import { deleteFavourites } from "../utils";

export interface FavouriteFlight extends Flight {
  currency: string;
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

  const deleteFavouriteTrip = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    deleteFavourites(user, id);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, deleteFavouriteTrip };
};
