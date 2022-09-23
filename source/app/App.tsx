/* global vscode, prevState, window, localTemplates */
// packages
import React, {
  useEffect, useMemo, useState, useCallback
} from 'react';
import {
  Navigate, Route, Routes, BrowserRouter
} from 'react-router-dom';
import { routes } from './routes/config';

// scripts
import { GlobalStateContext } from './context/MessageContext';
import {
  CommonMessage, Message, StateMessage
} from '../src/view/messages/messageTypes';
import { IFolder } from './utils/interfaces/remoteFolders.interface';

export const App = () => {
  const [globalStateFromExtension, setGlobalStateFromExtension] = useState<Record<string, any>>({});
  const [localTemplateList, setLocalTemplateList] = useState<IFolder[]>([]);

  const handleStateFromExtension = useCallback(
    (event: MessageEvent<Message>) => {
      switch (event.data.type) {
        case 'COMMON': {
          const message = event.data as CommonMessage;
          setGlobalStateFromExtension({ ...globalStateFromExtension, message: message.payload });
          break;
        }
        case 'SCAFFOLDING-GET-FILE': {
          const message = event.data;
          setGlobalStateFromExtension({
            ...globalStateFromExtension,
            scaffoldingFile: message.payload
          });
          break;
        }
        case 'ON-UPDATE-FILES': {
          const message = event.data;
          setLocalTemplateList(message.payload.map((item: string) => ({
            name: item
          })));

          break;
        }
        default:
          vscode.postMessage({
            type: 'ERROR',
            payload: 'Something went wrong'
          });
      }
    },
    [globalStateFromExtension]
  );

  const handleStateFromApp = (property: string, value: string, isPersistent = true) => {
    const data = { ...globalStateFromExtension, [property]: value };
    if (isPersistent) {
      vscode.postMessage<StateMessage>({
        type: 'STATE',
        payload: { ...data }
      });
    }
    setGlobalStateFromExtension({ ...data });
  };

  useEffect(() => {
    if (prevState) {
      const mapped = `${prevState.replace(/'/g, '"')}`;
      setGlobalStateFromExtension(JSON.parse(mapped));
    }
    if (localTemplates.length) {
      const data: IFolder[] = localTemplates.split(',').map((template) => ({ name: template }));
      setLocalTemplateList(data);
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

  const data = useMemo(
    () => ({
      globalStateFromExtension,
      handleStateFromApp,
      localTemplateList
    }),
    [globalStateFromExtension, localTemplateList]
  );

  return (
    <BrowserRouter>
      <GlobalStateContext.Provider value={data}>
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/">
            {routes.map((route, index) => (
              <Route key={route.path} index={!index} path={route.path} element={route.element}>
                {!!route.routes
                  && route.routes.map((subRoute, subIndex) => (
                    <Route
                      key={subRoute.path}
                      index={!subIndex}
                      path={subRoute.path}
                      element={subRoute.element}
                    />
                  ))}
              </Route>
            ))}
          </Route>
        </Routes>
      </GlobalStateContext.Provider>
    </BrowserRouter>
  );
};
