import { useRoutes } from 'react-router-dom';

import { Layout } from '../components';
import {
  HomePage,
  ListUsersPage,
  AboutUsersPage,
  FormPage,
  ReactHookFormTestPage,
  PersonSearchPage,
  PersonCreatePage,
  CreateRecordPage,
  UpdateRecordPage,
} from '../pages';
import PrivateRoutes from './PrivateRoutes';

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/users',
        element: <ListUsersPage />,
      },
      { path: '/users/about', element: <AboutUsersPage /> },
      {
        path: '/form-stepper',
        element: <FormPage />,
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: '/create/record/:validationType',
            element: <CreateRecordPage />,
          },
          {
            path: '/update/record/:recordId',
            element: <UpdateRecordPage />,
          },
        ],
      },
      {
        path: '/author-form',
        element: <ReactHookFormTestPage />,
      },
      {
        path: '/person-search',
        element: <PersonSearchPage />,
      },
      {
        path: '/person-create',
        element: <PersonCreatePage />,
      },
      {
        path: '/form',
        element: <CreateRecordPage />,
      },
      { path: '*', element: <div>404 not found</div> },
    ],
  },
];

export default function Router() {
  const element = useRoutes(routes);
  return element;
}
