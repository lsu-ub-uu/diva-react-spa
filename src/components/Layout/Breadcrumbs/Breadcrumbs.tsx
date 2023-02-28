import { Breadcrumbs as MuiBreadcrumbs, Link } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useTranslation } from 'react-i18next';

export const Breadcrumbs = () => {
  const location = useLocation();
  const { t } = useTranslation();

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
          sx={{ display: 'flex', alignItems: 'center' }}
          component={RouterLink}
          to={currentLink}
        >
          {t(crumb)}
        </Link>
      );
    });

  return (
    <MuiBreadcrumbs aria-label='breadcrumb'>
      <Link
        underline='hover'
        color='inherit'
        sx={{ display: 'flex', alignItems: 'center' }}
        component={RouterLink}
        to='/'
      >
        <HomeIcon
          sx={{ mr: 0.5 }}
          fontSize='inherit'
        />
        {t('start')}
      </Link>
      {crumbs}
    </MuiBreadcrumbs>
  );
};
