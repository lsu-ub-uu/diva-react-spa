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

import { Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteLoaderData } from 'react-router';
import { ActionFunctionArgs, data, json, LinksFunction, LoaderFunctionArgs } from 'react-router';
import { ReactNode } from 'react';
import { PageLayout, SnackbarProvider } from '@/components';
import { CssBaseline } from '@mui/material';
import { divaTheme } from '@/themes/diva';
import { getAuthentication, getSessionFromCookie } from '@/sessions';
import dev_favicon from '@/images/dev_favicon.svg';
import favicon from '@/images/favicon.svg';
import i18nServer from '@/i18n/i18n.server';
import { useChangeLanguage } from 'remix-i18next/react';
import { i18nCookie } from '@/i18n/i18nCookie';
import { getLoginUnits } from '@/data/getLoginUnits';

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

export async function loader({ request, context }: LoaderFunctionArgs) {
  const session = await getSessionFromCookie(request);
  const auth = getAuthentication(session);

  const loginUnits = getLoginUnits(context.dependencies);
  const locale = await i18nServer.getLocale(request);
  return { auth, locale, loginUnits };
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const language = formData.get('language');
  if (typeof language === 'string') {
    return data(
      {},
      {
        headers: {
          'Set-Cookie': await i18nCookie.serialize(language),
        },
      },
    );
  }
}

const Document = ({ children }: DocumentProps) => {
  const data = useRouteLoaderData<typeof loader>('root');
  const locale = data?.locale ?? 'sv';

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
  return (
    <Document>
      <CssBaseline />
      {children}
    </Document>
  );
};

export default function App() {
  return (
    <SnackbarProvider maxSnack={5}>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </SnackbarProvider>
  );
}
