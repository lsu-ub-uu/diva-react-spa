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

import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';
import { ReactNode, Suspense, useEffect } from 'react';
import { BackdropProvider, Layout, SnackbarProvider } from '@/components';
import store from '@/app/store';
import { CssBaseline } from '@mui/material';
import { divaTheme } from '@/themes/diva';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider as StateProvider } from 'react-redux';
import { getAuth } from '@/sessions';
import axios from 'axios';
import dev_favicon from '@/images/dev_favicon.svg';
import favicon from '@/images/favicon.svg';
import i18nServer from '@/app/i18n.server';
import { useChangeLanguage } from 'remix-i18next/react';
import { i18nCookie } from '@/app/i18nCookie';

interface DocumentProps {
  children: ReactNode;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const auth = await getAuth(request);
  const locale = await i18nServer.getLocale(request);
  return json(
    { auth, locale },
    {
      headers: { 'Set-Cookie': await i18nCookie.serialize(locale) },
    },
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const language = formData.get('language');
  if (typeof language === 'string') {
    return redirect('/', {
      headers: {
        'Set-Cookie': await i18nCookie.serialize(language),
      },
    });
  }
}

const Document = ({ children }: DocumentProps) => {
  const { locale } = useLoaderData<typeof loader>();
  const { MODE } = import.meta.env;
  useChangeLanguage(locale);

  return (
    <html lang={locale}>
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
        <link
          rel='icon'
          type='image/svg+xml'
          href={MODE === 'development' ? dev_favicon : favicon}
        />
        <title>DiVA</title>
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
};

export default function App() {
  const { auth } = useLoaderData<typeof loader>();

  useEffect(() => {
    axios.defaults.headers.common = {
      Authtoken: auth?.data.token ?? '',
    };
  }, [auth]);

  return (
    <Suspense>
      <Document>
        <CssBaseline />
        <BackdropProvider>
          <StateProvider store={store}>
            <SnackbarProvider maxSnack={5}>
              <ErrorBoundary
                fallback={<h1>Something went wrong. Try again later</h1>}
              >
                <Layout />
              </ErrorBoundary>
            </SnackbarProvider>
          </StateProvider>
        </BackdropProvider>
      </Document>
    </Suspense>
  );
}
