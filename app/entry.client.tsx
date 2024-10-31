/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import {
  ReactNode,
  startTransition,
  StrictMode,
  useMemo,
  useState,
} from 'react';
import { hydrateRoot } from 'react-dom/client';
import createEmotionCache from '@/createEmotionCache';
import ClientStyleContext from '@/ClientStyleContext';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { divaTheme } from '@/theme';
import { CssBaseline } from '@mui/material';
import axios from 'axios';

const { VITE_BFF_API_URL } = import.meta.env;
axios.defaults.baseURL = VITE_BFF_API_URL;

interface ClientCacheProviderProps {
  children: ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(createEmotionCache());

  const clientStyleContextValue = useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <ClientCacheProvider>
        <ThemeProvider theme={divaTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <RemixBrowser />
        </ThemeProvider>
      </ClientCacheProvider>
    </StrictMode>,
  );
});
