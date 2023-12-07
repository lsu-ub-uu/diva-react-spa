import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { AsidePortal, Card } from '../components';
import { CreatePublicationCard } from '../partials';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('start')} | DiVA</title>
      </Helmet>
      <div>
        <AsidePortal>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac
            mattis metus. Quisque condimentum cursus egestas. Suspendisse tellus
            dolor, euismod at dui a, ultrices tempor erat.
          </p>
        </AsidePortal>
        <Stack spacing={2}>
          <CreatePublicationCard />
          <Card
            title='Editera manuskript'
            variant='variant2'
            tooltipTitle='test'
            tooltipBody='test'
          >
            <Button
              disableRipple
              variant='text'
              component={RouterLink}
              to='/update/record/divaOutput:519333261463755'
            >
              Editera divaOutput:519333261463755
            </Button>
          </Card>
        </Stack>
      </div>
    </>
  );
};
