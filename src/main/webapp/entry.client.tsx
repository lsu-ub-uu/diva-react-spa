/**
 * By default, Remix will handle hydrating your webapp on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import axios from 'axios';
import i18next from 'i18next';
import { MuiProvider } from '@/mui/MuiProvider';
import { I18nextProvider } from 'react-i18next';
import { initClienti18n } from '@/app/i18n.client';

const { VITE_BFF_API_URL } = import.meta.env;

async function hydrate() {
  axios.defaults.baseURL = VITE_BFF_API_URL;
  await initClienti18n();

  startTransition(() => {
    hydrateRoot(
      document,
      <I18nextProvider i18n={i18next}>
        <StrictMode>
          <MuiProvider>
            <RemixBrowser />
          </MuiProvider>
        </StrictMode>
      </I18nextProvider>,
    );
  });
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1);
}
