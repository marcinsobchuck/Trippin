import React from "react";
import { FavouriteFlight } from "../Search/components/SearchResults/hooks/useFavourites";
import { TextPrimary, TripContainer } from "./FavouriteTrip.styled";

// id: string;
// from: string;
// fromCountry: string;
// to: string;
// toCountry: string;
// price: number;
// depart: number;
// arrival: number;
// link: string;

interface FavouriteTripProps {
  trip: FavouriteFlight;
}

export const FavouriteTrip: React.FC<FavouriteTripProps> = ({ trip }) => {
  return (
    <TripContainer>
      <TextPrimary>
        {trip.from}, {trip.fromCountry}
      </TextPrimary>
    </TripContainer>
  );
};
