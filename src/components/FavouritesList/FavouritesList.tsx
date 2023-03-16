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

export const FavouritesList: React.FC = () => {
  const { currentUser } = useAuth();
  const { data, isLoading } = useFavourites(currentUser);

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

  return (
    <>
      <FavouriteTripsContainer>
        {data
          .sort((a, b) => a.dTimeUTC - b.dTimeUTC)
          .map((flight) => (
            <FavouriteTrip key={flight.id} flight={flight} />
          ))}
      </FavouriteTripsContainer>
    </>
  );
};
