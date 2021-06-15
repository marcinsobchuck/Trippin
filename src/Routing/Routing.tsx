import React from "react";

import { Route, Switch } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { Routes } from "../enums/routes.enum";
import { Entry } from "../views/Entry/Entry";
import { ForgottenPassword } from "../views/ForgottenPassword/ForgottenPassword";
import { Home } from "../views/Home/Home";
import { Wishlist } from "../views/Wishlist/Wishlist";
import { PrivateRoute } from "./PrivateRoute";

export const Routing: React.FC = () => {
  return (
    <Switch>
      <AuthProvider>
        <Route exact path={Routes.Home} component={Home} />
        <Route path={Routes.Entry} component={Entry} />
        <Route path={Routes.ForgottenPassword} component={ForgottenPassword} />
        <PrivateRoute path={Routes.Wishlist} component={Wishlist} />
      </AuthProvider>
    </Switch>
  );
};
