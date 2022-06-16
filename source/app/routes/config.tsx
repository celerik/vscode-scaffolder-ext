// packages
import React from 'react';
import Dashboard from '../components/Dashboard';
import Settings from '../components/Settings';

// scripts
export type RouteConfigComponentProps = Pick<RouteConfig, 'routes'>;

export type RouteConfig = {
  path: string;
  element: JSX.Element;
  routes?: RouteConfig[];
};

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Dashboard />
  },
  {
    path: '/settings',
    element: <Settings />,
  }
];
