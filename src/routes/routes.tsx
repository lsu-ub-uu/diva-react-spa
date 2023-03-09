import { useRoutes } from 'react-router-dom';
import { Layout } from '../components';
import {
  HomePage,
  ListUsersPage,
  FormPage,
  DemoFormPage,
  ReactHookFormTestPage,
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
      { path: '/users/about', element: <div>show about user</div> },
      {
        path: '/form',
        element: <FormPage />,
      },
      {
        path: '/demo-form',
        element: <DemoFormPage />,
      },
      {
        path: '/author-form',
        element: <ReactHookFormTestPage />,
      },
      { path: '*', element: <div>404 not found</div> },
    ],
  },
];

export default function Router() {
  const element = useRoutes(routes);
  return element;
}
