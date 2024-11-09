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
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import {
  ActionFunctionArgs,
  json,
  LinksFunction,
  LoaderFunctionArgs,
} from '@remix-run/node';
import { ReactNode, Suspense, useEffect } from 'react';
import { BackdropProvider, PageLayout, SnackbarProvider } from '@/components';
import store from '@/app/store';
import { Alert, AlertTitle, CssBaseline } from '@mui/material';
import { divaTheme } from '@/themes/diva';
import { Provider as StateProvider } from 'react-redux';
import { getAuth } from '@/sessions';
import axios from 'axios';
import dev_favicon from '@/images/dev_favicon.svg';
import favicon from '@/images/favicon.svg';
import i18nServer from '@/app/i18n.server';
import { useChangeLanguage } from 'remix-i18next/react';
import { i18nCookie } from '@/app/i18nCookie';
import { getLoginUnits } from '@/data/getLoginUnits';
import { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';

const { MODE } = import.meta.env;

interface DocumentProps {
  children: ReactNode;
}

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    type: 'image/svg+xml',
    href: MODE === 'development' ? dev_favicon : favicon,
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const auth = await getAuth(request);
  const loginUnits = await getLoginUnits();
  const locale = await i18nServer.getLocale(request);
  return json({ auth, locale, loginUnits });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const language = formData.get('language');
  if (typeof language === 'string') {
    return json(
      {},
      {
        headers: {
          'Set-Cookie': await i18nCookie.serialize(language),
        },
      },
    );
  }
}

export const ErrorBoundary: ErrorBoundaryComponent = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Alert severity='error'>
        <AlertTitle>
          {error.status} {error.statusText}
        </AlertTitle>
        <p>{error.data}</p>
      </Alert>
    );
  } else if (error instanceof Error) {
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </Alert>
    );
  } else {
    return (
      <Alert severity='error'>
        <AlertTitle>Unknown Error</AlertTitle>
      </Alert>
    );
  }
};

const Document = ({ children }: DocumentProps) => {
  const { locale } = useLoaderData<typeof loader>();

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

export const Layout = ({ children }: { children: ReactNode }) => {
  const { auth } = useLoaderData<typeof loader>();

  useEffect(() => {
    axios.defaults.headers.common = {
      Authtoken: auth?.data.token ?? '',
    };
  }, [auth]);

  return (
    <Document>
      <CssBaseline />
      {children}
    </Document>
  );
};

export default function App() {
  return (
    <BackdropProvider>
      <StateProvider store={store}>
        <SnackbarProvider maxSnack={5}>
          <PageLayout>
            <Outlet />
          </PageLayout>
        </SnackbarProvider>
      </StateProvider>
    </BackdropProvider>
  );
}
