import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, styled } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Provider as StateProvider } from 'react-redux';
import store from './app/store';
import { divaTheme } from './themes/diva';
import App from './App';
import { worker } from './__mocks__/browser';
import { BackdropProvider } from './components';

if (process.env.NODE_ENV === 'development') {
  worker.start().then();
}

const StyledSnackbarProvider = styled(SnackbarProvider)(() => ({
  '&.notistack-MuiContent': {
    backgroundColor: '#efefef',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  '&.notistack-MuiContent-success': {
    svg: {
      color: 'rgb(56, 142, 60)',
      fill: 'rgb(56, 142, 60)',
    },
  },
  '&.notistack-MuiContent-error': {
    svg: {
      color: 'rgb(211, 47, 47)',
      fill: 'rgb(211, 47, 47)',
    },
  },
  '&.notistack-MuiContent-warning': {
    svg: {
      color: 'rgb(245, 124, 0)',
      fill: 'rgb(245, 124, 0)',
    },
  },
  '&.notistack-MuiContent-info': {
    svg: {
      color: 'rgb(2, 136, 209)',
      fill: 'rgb(2, 136, 209)',
    },
  },
}));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BackdropProvider>
      <StateProvider store={store}>
        <ThemeProvider theme={divaTheme}>
          <CssBaseline />
          <StyledSnackbarProvider maxSnack={5}>
            <App />
          </StyledSnackbarProvider>
        </ThemeProvider>
      </StateProvider>
    </BackdropProvider>
  </React.StrictMode>,
);
