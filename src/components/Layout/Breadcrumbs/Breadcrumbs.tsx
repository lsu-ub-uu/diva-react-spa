import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Breadcrumbs = () => {
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
      <Link
        underline='hover'
        color='inherit'
        component={RouterLink}
        to='/about'
      >
        About
      </Link>
      <Link
        underline='hover'
        color='text.primary'
        component={RouterLink}
        to='/about/tech'
        aria-current='page'
      >
        Tech
      </Link>
    </MuiBreadcrumbs>
  );
};
