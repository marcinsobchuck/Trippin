import React from 'react';

import { Route, Switch } from 'react-router-dom';

// import { NotFound404 } from 'src/views/NotFound404/NotFound404';

import { Routes } from '../enums/routes.enum';
import { Entry } from '../views/Entry/Entry';
import { Favourites } from '../views/Favourites/Favourites';
import { ForgottenPassword } from '../views/ForgottenPassword/ForgottenPassword';
import { Home } from '../views/Home/Home';

import { PrivateRoute } from './PrivateRoute';

export const Routing: React.FC = () => (
  <Switch>
    <Route exact path={Routes.Home} component={Home} />
    <Route path={Routes.Entry} component={Entry} />
    <Route path={Routes.ForgottenPassword} component={ForgottenPassword} />
    <PrivateRoute path={Routes.Favourites} component={Favourites} />
    {/* <Route path="*" component={NotFound404} /> */}
  </Switch>
);
