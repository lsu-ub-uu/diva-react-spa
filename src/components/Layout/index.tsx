import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Button, Link } from '@mui/material';

export const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Button
              component={RouterLink}
              to='/'
              variant='contained'
            >
              Home
            </Button>
          </li>
          <li>
            <Link
              component={RouterLink}
              to='/about'
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
      <hr />
      <p>footer goes here</p>
    </div>
  );
};
