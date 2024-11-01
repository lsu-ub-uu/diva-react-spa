import { CacheProvider } from '@emotion/react';

import { ThemeProvider } from '@mui/material';

import createCache from '@emotion/cache';
import { divaTheme } from '@/theme';
import { ReactNode } from 'react';

function createEmotionCache() {
  return createCache({ key: 'css' });
}

export function MuiProvider({ children }: { children: ReactNode }) {
  const cache = createEmotionCache();

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={divaTheme}>{children}</ThemeProvider>
    </CacheProvider>
  );
}
