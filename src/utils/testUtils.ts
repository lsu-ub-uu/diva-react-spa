/* eslint-disable import/no-extraneous-dependencies */
import { render } from '@testing-library/react';
import { SnackbarProvider } from 'notistack';

const renderWithSnackbarProvider = (ui: JSX.Element) =>
  render(ui, { wrapper: SnackbarProvider });

export * from '@testing-library/react';

export { renderWithSnackbarProvider as render };
