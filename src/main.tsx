import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Provider as StateProvider } from 'react-redux';
import store from './app/store';
import { divaTheme } from './themes/diva';
import App from './App';
import { worker } from './__mocks__/browser';
import { BackdropProvider } from './components';

if (process.env.NODE_ENV === 'development') {
  worker.start().then();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BackdropProvider>
      <StateProvider store={store}>
        <ThemeProvider theme={divaTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StateProvider>
    </BackdropProvider>
  </React.StrictMode>,
);
