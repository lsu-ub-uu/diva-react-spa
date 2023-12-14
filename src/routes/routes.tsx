import { useRoutes } from 'react-router-dom';
import { Layout } from '../components';
import {
  HomePage,
  CreateRecordPage,
  UpdateRecordPage,
  ReactHookFormTestPage,
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
      { path: '/test', element: <ReactHookFormTestPage /> },
      { path: '*', element: <div>404 not found</div> },
    ],
  },
];

export default function Router() {
  return useRoutes(routes);
}
