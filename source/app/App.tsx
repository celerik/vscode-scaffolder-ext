// packages
import React, { useEffect, useState, useCallback } from 'react';
import { routes } from './routes/config';
import {
  Navigate,
  Route,
  Routes,
  BrowserRouter
} from 'react-router-dom';

// scripts
import { GlobalStateContext } from './context/MessageContext';
import { CommonMessage, Message, ReloadMessage, StateMessage } from '../src/view/messages/messageTypes';

export const App = () => {
  const [globalStateFromExtension, setGlobalStateFromExtension] = useState<Record<string, any>>({});

  const handleStateFromExtension = useCallback(
    (event: MessageEvent<Message>) => {
      if (event.data.type === 'COMMON') {
        const message = event.data as CommonMessage;
        setGlobalStateFromExtension({ ...globalStateFromExtension, message: message.payload });
      }
    },
    [globalStateFromExtension]
  );

  const handleStateFromApp = (property: string, value: string) => {
    const data = { ...globalStateFromExtension, [property]: value };
    vscode.postMessage<StateMessage>({
      type: 'STATE',
      payload: { ...data },
    });
    setGlobalStateFromExtension({ ...data });

  };

  useEffect(() => {
    debugger
    if (prevState) {
      const mapped = `${prevState.replace(/'/g, '"')}`;
      setGlobalStateFromExtension(JSON.parse(mapped));
      return;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', (event: MessageEvent<Message>) => {
      handleStateFromExtension(event);
    });

    return () => {
      window.removeEventListener('message', handleStateFromExtension);
    };
  }, [handleStateFromExtension]);

  return (
    <BrowserRouter>
      <GlobalStateContext.Provider value={{ globalStateFromExtension, handleStateFromApp }}>
        <Routes>
          <Route path='*' element={<Navigate to='/' />} />
          <Route path='/'>
            {routes.map((route, index) => (
              <Route key={index} index={!index} path={route.path} element={route.element}>
                {!!route.routes && route.routes.map((subRoute, subIndex) => (
                  <Route key={subIndex} index={!subIndex} path={subRoute.path} element={subRoute.element} />
                ))}
              </Route>
            ))}
          </Route>
        </Routes>
      </GlobalStateContext.Provider>
    </BrowserRouter>
  );
};
