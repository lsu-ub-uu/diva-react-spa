import { useRoutes } from 'react-router-dom';
import { Layout } from '../components';
import {
  HomePage,
  ListUsersPage,
  AboutUsersPage,
  FormPage,
  ReactHookFormTestPage,
  RecordTypePage,
  AdminSearchPage,
} from '../pages';

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
        path: '/form',
        element: <FormPage />,
      },
      {
        path: '/admin-search',
        element: <AdminSearchPage />,
      },
      {
        path: '/recordtype',
        element: <RecordTypePage />,
      },
      {
        path: '/author-form',
        element: <ReactHookFormTestPage />,
      },
      {
        path: '/admin-search',
        element: <AdminSearchPage />,
      },
      { path: '*', element: <div>404 not found</div> },
    ],
  },
];

export default function Router() {
  const element = useRoutes(routes);
  return element;
}
