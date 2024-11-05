/**
 * By default, Remix will handle hydrating your webapp on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import axios from 'axios';
import { MuiProvider } from '@/mui/MuiProvider';
import '@/app/i18n.client';

const { VITE_BFF_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_BFF_API_URL;

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <MuiProvider>
        <RemixBrowser />
      </MuiProvider>
    </StrictMode>,
  );
});
