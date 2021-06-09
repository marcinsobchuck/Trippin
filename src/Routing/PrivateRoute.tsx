import React from "react";

import { Route, RouteProps, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Routes } from "../enums/routes.enum";

interface PrivateRouteProps extends RouteProps {
  component: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <Route {...rest}>
      {currentUser ? <Component /> : <Redirect to={Routes.Entry} />}
    </Route>
  );
};
