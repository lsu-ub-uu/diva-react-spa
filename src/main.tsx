import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import axios from 'axios';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Provider as StateProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
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
              <App />
            </HelmetProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </StateProvider>
    </BackdropProvider>
  </React.StrictMode>,
);
