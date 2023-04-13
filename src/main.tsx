import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
// import { SnackbarProvider } from 'notistack';
import { Provider as StateProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import store from './app/store';
import { divaTheme } from './themes/diva';
import App from './App';
import { worker } from './__mocks__/browser';
import { BackdropProvider, SnackbarProvider } from './components';

if (process.env.NODE_ENV === 'development') {
  worker.start().then();
}

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
