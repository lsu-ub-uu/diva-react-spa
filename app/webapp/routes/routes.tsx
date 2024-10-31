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

import { Outlet, useRoutes } from '@remix-run/react';
import PrivateRoutes from '@/webapp/routes/PrivateRoutes';
import {
  HomePage,
  LoginPage,
  UpdateRecordPage,
  ViewRecordPage,
} from '@/webapp/pages';

export const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          // {
          //   path: '/create/record/:validationType',
          //   element: <CreateRecordPage />,
          // },
          {
            path: '/update/record/:recordType/:recordId',
            element: <UpdateRecordPage />,
          },
        ],
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/view/record/:recordType/:recordId',
        element: <ViewRecordPage />,
      },
      { path: '*', element: <div>404 not found</div> },
    ],
  },
];

export default function Router() {
  return useRoutes(routes);
}
