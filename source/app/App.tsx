// packages
import React, { useEffect, useState, useCallback } from 'react';
import { routes } from './routes/config';
import { Navigate, Route, Routes, BrowserRouter } from 'react-router-dom';

// scripts
import { MessagesContext } from './context/MessageContext';
import { CommonMessage, Message, ReloadMessage } from '../src/view/messages/messageTypes';

export const App = () => {
  const [messagesFromExtension, setMessagesFromExtension] = useState<string[]>([]);
  console.log('this is the render');
  const handleMessagesFromExtension = useCallback(
    (event: MessageEvent<Message>) => {
      if (event.data.type === 'COMMON') {
        const message = event.data as CommonMessage;
        setMessagesFromExtension([...messagesFromExtension, message.payload]);
      }
    },
    [messagesFromExtension]
  );

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent<Message>) => {
      handleMessagesFromExtension(event);
    });

    return () => {
      window.removeEventListener('message', handleMessagesFromExtension);
    };
  }, [handleMessagesFromExtension]);

  return (
    <BrowserRouter>
      <MessagesContext.Provider value={messagesFromExtension}>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/">
            {routes.map((route, index) => (
              <Route key={index} index={!index} path={route.path} element={route.element}>
                {!!route.routes &&
                  route.routes.map((subRoute, subIndex) => (
                    <Route
                      key={subIndex}
                      index={!subIndex}
                      path={subRoute.path}
                      element={subRoute.element}
                    />
                  ))}
              </Route>
            ))}
          </Route>
        </Routes>
      </MessagesContext.Provider>
    </BrowserRouter>
  );
};
