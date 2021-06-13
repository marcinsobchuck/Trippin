import React from "react";
import { Redirect } from "react-router-dom";

import { Routes } from "../../enums/routes.enum";
import { useAuth } from "../../hooks/useAuth";

export const Home: React.FC = () => {
  const { isFirstEntry, currentUser } = useAuth();
  console.log(currentUser);
  return (
    <>
      <div>Home</div>
      {isFirstEntry && !currentUser && <Redirect to={Routes.Entry} />}
    </>
  );
};
