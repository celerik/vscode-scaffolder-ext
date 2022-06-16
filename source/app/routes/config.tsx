import React from 'react';
import { Home } from '../components/Home';
import { About } from '../components/About';
import { Message } from '../components/Message';
import { ReceivedMessages } from '../components/ReceivedMessages';
import { SendMessage } from '../components/SendMessage';

export type RouteConfigComponentProps = Pick<RouteConfig, 'routes'>;

export type RouteConfig = {
  path: string;
  element: React.ComponentType<RouteConfigComponentProps>;
  exact?: boolean;
  routes?: RouteConfig[];
};

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: Home,
    exact: true
  },
  {
    path: '/about',
    element: About,
  },
  {
    path: '/message',
    element: Message,
    routes: [
      {
        path: '/message/received',
        element: ReceivedMessages,
      },
      {
        path: '/message/send',
        element: SendMessage,
      },
    ],
  },
];
