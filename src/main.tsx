/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Provider as StateProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import store from './app/store';
import { divaTheme } from './themes/diva';
import App from './App';
import { BackdropProvider, SnackbarProvider } from './components';

// Setup axios baseUrl from env variable
const { VITE_BFF_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_BFF_API_URL;

console.log('axios.baseUrl: ', axios.defaults.baseURL);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BackdropProvider>
      <StateProvider store={store}>
        <ThemeProvider theme={divaTheme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={5}>
            <HelmetProvider>
              <ErrorBoundary
                fallback={<h1>Something went wrong. Try again later</h1>}
              >
                <App />
              </ErrorBoundary>
            </HelmetProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </StateProvider>
    </BackdropProvider>
  </React.StrictMode>,
);
