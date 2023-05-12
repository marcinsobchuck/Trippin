import React from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';

import { Routes } from '../enums/routes.enum';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps extends RouteProps {
  component: React.FC;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return <Route {...rest}>{currentUser ? <Component /> : <Redirect to={Routes.Entry} />}</Route>;
};
