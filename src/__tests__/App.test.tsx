import { test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Provider as StateProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';
import store from '../app/store';
import { divaTheme } from '../themes/diva';
import { BackdropProvider, SnackbarProvider } from '../components';

/**
 * @vitest-environment jsdom
 */
describe('<App />', () => {
  test('App Renders', async () => {
    render(
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
      </BackdropProvider>,
    );

    await waitFor(() => {
      const logoImage = screen.getByAltText('logo');
      expect(logoImage).toBeInTheDocument();
    });
  });
});
