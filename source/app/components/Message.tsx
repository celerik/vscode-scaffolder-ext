import React from 'react';
import { RouteWithSubRoutes } from '../routes/RouteWithSubRoutes';
import { RouteConfigComponentProps } from '../routes/config';

export const Message: React.FC<RouteConfigComponentProps> = ({ routes }) => {
  return (
    <div>
      <h1>Message</h1>
    </div>
  );
};
