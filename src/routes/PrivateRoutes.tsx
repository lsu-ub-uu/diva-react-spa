import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { authStateSelector } from '../features/auth/selectors';

const PrivateRoutes = () => {
  const authState = useAppSelector(authStateSelector);
  return authState.isAuthenticated ? (
    <Outlet />
  ) : (
    <p>You need to be logged in to be able to create publications.</p>
  );
};

export default PrivateRoutes;
