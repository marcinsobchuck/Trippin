import React from "react";
import { useAuth } from "src/hooks/useAuth";
import { useFavourites } from "../Search/components/SearchResults/hooks/useFavourites";
import {
  Email,
  Heading,
  UserIcon,
  UserInfoWrapper,
} from "./FavouritesList.styled";

import user from "src/assets/images/user.svg";
import {
  FavouriteTrip,
  FavouriteTripsContainer,
} from "src/views/Favourites/Favourites.styled";

export const FavouritesList: React.FC = () => {
  const { currentUser } = useAuth();
  const data = useFavourites(currentUser);
  console.log(data);

  return (
    <>
      <UserInfoWrapper>
        <UserIcon src={user} />
        <Email>{currentUser?.email}</Email>
      </UserInfoWrapper>

      <Heading>Your trips</Heading>
      <FavouriteTripsContainer>
        {data.map((trip) => (
          <FavouriteTrip>
            <p>{trip.from}</p> to <p>{trip.to}</p>
          </FavouriteTrip>
        ))}
      </FavouriteTripsContainer>
    </>
  );
};
