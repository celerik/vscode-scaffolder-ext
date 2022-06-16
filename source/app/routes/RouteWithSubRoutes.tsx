import React from 'react';
import { Route } from 'react-router-dom';
import { RouteConfig } from './config';

export const RouteWithSubRoutes = (route: RouteConfig) => {
  return (
    <Route path={route.path}>
      <route.element routes={route.routes} />
    </Route>
  );
};
