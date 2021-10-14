import React from "react";
import { Redirect } from "react-router-dom";

import { SearchDestinationSection } from "../../components/SearchDestinationSection/SearchDestinationSection";

import { Routes } from "../../enums/routes.enum";
import { useAuth } from "../../hooks/useAuth";

export const Home: React.FC = () => {
  const { isFirstEntry, currentUser } = useAuth();

  return (
    <>
      <SearchDestinationSection />

      {isFirstEntry && !currentUser && <Redirect to={Routes.Entry} />}
    </>
  );
};
