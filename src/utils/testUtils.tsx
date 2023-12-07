/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';
import { Provider as StateProvider } from 'react-redux';
import { configureStore, PreloadedState } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import type { RenderOptions } from '@testing-library/react';
import { AppStore, RootState } from '../app/store';

import publicationTypeReducer from '../features/publicationTypes/publicationTypeSlice';
import subjectCategoryReducer from '../features/subjectCategory/subjectCategorySlice';
import researchSubjectReducer from '../features/researchSubject/researchSubjectSlice';
import authReducer from '../features/auth/authSlice';

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
        subjectCategory: subjectCategoryReducer,
        researchSubject: researchSubjectReducer,
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
