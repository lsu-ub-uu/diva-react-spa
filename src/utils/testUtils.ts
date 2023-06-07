import { render } from '@testing-library/react';
import { SnackbarProvider, useSnackbar } from 'notistack';

const renderWithSnackbarProvider = (ui) =>
  render(ui, { wrapper: SnackbarProvider });

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithSnackbarProvider as render };
