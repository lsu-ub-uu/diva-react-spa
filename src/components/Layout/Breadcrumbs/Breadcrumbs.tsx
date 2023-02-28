import {
  Breadcrumbs as MuiBreadcrumbs,
  createSvgIcon,
  Link,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TestIcon = createSvgIcon(
  <path d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' />,
  'Test',
);

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
          underline='always'
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
        underline='always'
        color='inherit'
        sx={{ display: 'flex', alignItems: 'center' }}
        component={RouterLink}
        to='/'
      >
        <TestIcon
          sx={{ mr: 0.5 }}
          color='inherit'
          fontSize='inherit'
        />
        {t('start')}
      </Link>
      {crumbs}
    </MuiBreadcrumbs>
  );
};
