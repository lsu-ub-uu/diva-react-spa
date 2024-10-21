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

import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Provider as StateProvider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App';
import store from '@/app/store';
import { divaTheme } from '@/themes/diva';
import { BackdropProvider, SnackbarProvider } from '@/components';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

describe('<App />', () => {
  it('App Renders', () => {
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

    const logoImage = screen.getByAltText('logo');
    screen.debug();
    expect(logoImage).toBeInTheDocument();
  });
});
