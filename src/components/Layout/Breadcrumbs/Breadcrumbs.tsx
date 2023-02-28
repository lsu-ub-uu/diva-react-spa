import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

export const Breadcrumbs = () => {
  const location = useLocation();

  let currentLink = '';

  const crumbs = location.pathname
    ?.split('/')
    .filter((crumb: string) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      return (
        <Link
          key={crumb}
          underline='hover'
          color='inherit'
          component={RouterLink}
          to={currentLink}
        >
          {crumb}
        </Link>
      );
    });

  return (
    <MuiBreadcrumbs aria-label='breadcrumb'>
      <Link
        underline='hover'
        color='inherit'
        component={RouterLink}
        to='/'
      >
        Start
      </Link>
      {crumbs}
    </MuiBreadcrumbs>
  );
};
