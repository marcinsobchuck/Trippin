import { useCallback, useEffect, useState } from 'react';

import { User } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import moment from 'moment';

import { Flight } from 'src/apiServices/types/kiwiApi.types';
import { db, deleteFavourites } from 'src/firebase';

export interface FavouriteFlight extends Flight {
  currency: string;
}

const now = moment();

const filterAndSortData = (data: FavouriteFlight[], user: User) => {
  const filteredData = data.filter((flight) => {
    if (moment.unix(flight.dTime).diff(now, 'hours') <= 3) {
      deleteFavourites(user, flight.id);
    }
    return moment.unix(flight.dTime).diff(now, 'hours') >= 3;
  });
  const sortedData = filteredData.sort((a, b) => a.dTimeUTC - b.dTimeUTC);
  return sortedData;
};

export const useFavourites = (user: User, initialData: FavouriteFlight[] = []) => {
  const [data, setData] = useState<FavouriteFlight[]>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    const favourites: FavouriteFlight[] = [];
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, `/users/${user?.uid}/favourites`));

      querySnapshot.forEach((doc) => {
        favourites.push(doc.data() as FavouriteFlight);
      });

      setData(filterAndSortData(favourites, user));
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  }, [user]);

  const deleteFavouriteTrip = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    return deleteFavourites(user, id);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, deleteFavouriteTrip };
};
