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

/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { Provider as StateProvider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { AppStore, RootState } from '../app/store';

import publicationTypeReducer from '../features/publicationTypes/publicationTypeSlice';
import authReducer from '../features/auth/authSlice';
import publicationsReducer from '../features/publications/publicationsSlice';
import loginUnitsReducer from '../features/loginUnits/loginUnitsSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const renderWithSnackbarProvider = (ui: JSX.Element) =>
  render(ui, { wrapper: SnackbarProvider });

const renderWithReduxProvider = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({
      reducer: {
        auth: authReducer,
        publicationType: publicationTypeReducer,
        publications: publicationsReducer,
        loginUnits: loginUnitsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <StateProvider store={store}>{children}</StateProvider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from '@testing-library/react';

export {
  renderWithSnackbarProvider as render,
  renderWithReduxProvider as reduxRender,
};
