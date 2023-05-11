import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import {
  AsidePortal,
  Card,
  TabsMenu,
  SubjectCategoryPicker,
} from '../components';

export const HomePage = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Helmet>
        <title>{t('start')} | DiVA</title>
      </Helmet>
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
              to='/person-form'
              endIcon={<ArrowForwardIcon />}
            >
              Add publication
            </Button>
            <Button
              disableRipple
              variant='contained'
              component={RouterLink}
              to='/person-search'
              endIcon={<SearchIcon />}
            >
              Find persons
            </Button>
          </Stack>
        </AsidePortal>
        <TabsMenu />
        <Stack spacing={2}>
          <Card
            title='National subject category'
            variant='variant6'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
          >
            <SubjectCategoryPicker
              onSelect={(id) =>
                enqueueSnackbar(`Subject ${id} was successfully added`, {
                  variant: 'success',
                  anchorOrigin: { vertical: 'top', horizontal: 'right' },
                })
              }
            />
          </Card>
          <Card
            title='Variant1'
            variant='variant1'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
            expanded={false}
          >
            <Button
              size='medium'
              disableRipple
              variant='outlined'
            >
              Medium outlined
            </Button>
            <Button
              size='medium'
              disableRipple
              variant='contained'
            >
              Med contained
            </Button>
            <Button
              size='large'
              disableRipple
              variant='outlined'
            >
              large outlined
            </Button>
          </Card>
          <Card
            title='Variant2'
            variant='variant2'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
          >
            {t('Welcome')}
          </Card>
          <Card
            title='Variant3'
            variant='variant3'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
          >
            {t('Welcome')}
          </Card>
          <Card
            title='Variant4'
            variant='variant4'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
          >
            {t('Welcome')}
          </Card>
          <Card
            title='Variant5'
            variant='variant5'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
          >
            {t('Welcome')}
          </Card>
          <Card
            title='Variant6'
            variant='variant6'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
          >
            {t('Welcome')}
          </Card>
        </Stack>
      </div>
    </>
  );
};
