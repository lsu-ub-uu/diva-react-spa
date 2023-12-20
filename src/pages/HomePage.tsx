import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { AsidePortal } from '../components';
import { CreatePublicationCard, ListPublicationsCard } from '../partials';

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
          <ListPublicationsCard />
        </Stack>
      </div>
    </>
  );
};
