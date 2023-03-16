import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AsidePortal, Card, TabsMenu } from '../components';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <AsidePortal>
        <p>
          This is the homepage show some messages here perhaps - this was sent
          via the AsidePortal component
        </p>
        <Stack spacing={2}>
          <Button
            disableRipple
            variant='contained'
            component={RouterLink}
            to='/demo-form'
            endIcon={<ArrowForwardIcon />}
          >
            Simple search form
          </Button>
          <Button
            disableRipple
            variant='contained'
            component={RouterLink}
            to='/author-form'
            endIcon={<ArrowForwardIcon />}
          >
            Add publication
          </Button>
          <Button
            disableRipple
            variant='contained'
            component={RouterLink}
            to='/users'
            endIcon={<SearchIcon />}
          >
            Find persons
          </Button>
        </Stack>
      </AsidePortal>
      <TabsMenu />
      <Card
        title='Publications'
        variant='variant1'
        tooltipTitle='Publication'
        tooltipBody='Publications help body text tooltip'
      >
        {t('Welcome')}
      </Card>
    </div>
  );
};
