import React from "react";
import { useAuth } from "src/hooks/useAuth";
import { useFavourites } from "../Search/components/SearchResults/hooks/useFavourites";
import { FavouriteTrip } from "./FavouriteTrip";
import { Oval } from "react-loader-spinner";
import { Colors } from "src/enums/colors.enum";
import {
  FavouriteTripsContainer,
  NoResults,
  NoResultsLink,
  NoResultsText,
} from "./FavouritesList.styled";
import { Routes } from "src/enums/routes.enum";
import { RedirectButton } from "src/styles/Button.styled";
import { useTransition } from "react-spring";

export const FavouritesList: React.FC = () => {
  const { currentUser } = useAuth();

  const { data, isLoading, deleteFavouriteTrip } = useFavourites(currentUser);

  const sortedData = data.sort((a, b) => a.dTimeUTC - b.dTimeUTC);

  const transitions = useTransition(sortedData, {
    keys: (flight) => flight.id,
    trail: 100,
    from: {
      transform: "translate3d(0px, -20px, 0px) scale(1)",
      opacity: 0,
      height: 0,
    },
    enter: (flight) => ({
      transform: "translate3d(0px, 0px, 0px) scale(1)",
      opacity: 1,
      height: flight.duration.return > 0 ? 330 : 160,
    }),
    leave: {
      transform: "translate3d(0px, 20px, 0px) scale(0)",
      opacity: 0,
      height: 0,
      marginBottom: 0,
    },
  });

  if (isLoading)
    return (
      <Oval
        color={Colors.DarkBlue}
        secondaryColor={Colors.Blue}
        wrapperStyle={{
          display: "flex",
          justifyContent: "center",
          marginTop: "90px",
        }}
      />
    );

  if (data.length === 0) {
    return (
      <FavouriteTripsContainer>
        <NoResults>
          <NoResultsText>You don't have any upcoming trips.</NoResultsText>
          <NoResultsLink>
            Add your next trip to favourites and it will appear here.
          </NoResultsLink>
          <RedirectButton to={Routes.Home} variant='quaternary' width={162}>
            Search now
          </RedirectButton>
        </NoResults>
      </FavouriteTripsContainer>
    );
  }

  const handleDeleteFavouriteTrip = (id: string) => {
    deleteFavouriteTrip(id);
  };

  return (
    <>
      <FavouriteTripsContainer>
        {transitions((styles, flight) => (
          <FavouriteTrip
            key={flight.id}
            flight={flight}
            onDelete={handleDeleteFavouriteTrip}
            style={styles}
          />
        ))}
      </FavouriteTripsContainer>
    </>
  );
};
