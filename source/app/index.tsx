// packages
import React from 'react';
import { createRoot } from "react-dom/client";
import { ThemeProvider } from '@mui/material/styles';

// scripts
import { App } from './App';
import theme from './styles/theme';
import './index.css';

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
