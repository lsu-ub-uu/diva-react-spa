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

import { Links, Meta, Scripts, ScrollRestoration } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { ThemeProvider, withEmotionCache } from '@emotion/react';
import { ReactNode, Suspense, useContext } from 'react';
import ClientStyleContext from '@/ClientStyleContext';
import {
  BackdropProvider,
  Layout as RootLayout,
  SnackbarProvider,
} from '@/webapp/components';
import store from '@/webapp/app/store';
import { CssBaseline } from '@mui/material';
import '@/webapp/app/i18n';
import { divaTheme } from '@/webapp/themes/diva';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider as StateProvider } from 'react-redux';

export const links: LinksFunction = () => [];

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEnhancedEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData.reset();
    }, []);

    return (
      <html lang='en'>
        <head>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1'
          />
          <meta
            name='theme-color'
            content={divaTheme.palette.primary.main}
          />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <meta
            name='emotion-insertion-point'
            content='emotion-insertion-point'
          />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  },
);

export function Layout({ children }: { children: ReactNode }) {
  return <Document>{children}</Document>;
}

export default function App() {
  return (
    <BackdropProvider>
      <StateProvider store={store}>
        <ThemeProvider theme={divaTheme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={5}>
            <ErrorBoundary
              fallback={<h1>Something went wrong. Try again later</h1>}
            >
              <Suspense fallback={<h3>Waiting for DiVA 3 GUI to load...</h3>}>
                <RootLayout />
              </Suspense>
            </ErrorBoundary>
          </SnackbarProvider>
        </ThemeProvider>
      </StateProvider>
    </BackdropProvider>
  );
}
