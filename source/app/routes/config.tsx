/* global JSX */
// packages
import React from 'react';
import Dashboard from '../components/pages/dashboard';
import Settings from '../components/pages/settings';

// scripts
export type RouteConfig = {
  path: string;
  element: JSX.Element;
  routes?: RouteConfig[];
};

export type RouteConfigComponentProps = Pick<RouteConfig, 'routes'>;

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/settings',
    element: <Settings />
  }
];
