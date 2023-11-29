import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { AsidePortal, Card, TabsMenu } from '../components';

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
            This is the homepage show some messages here perhaps - this was sent
            via the AsidePortal component
          </p>
          <Stack spacing={2}>
            <Button
              disableRipple
              variant='contained'
              component={RouterLink}
              to='/author-form'
              endIcon={<ArrowForwardIcon />}
            >
              Add author spike
            </Button>
            <Button
              disableRipple
              variant='contained'
              component={RouterLink}
              to='/update/record/divaOutput:519333261463755'
            >
              Update existing record
            </Button>
            <Button
              disableRipple
              variant='contained'
              component={RouterLink}
              to='/form'
              endIcon={<FileUploadIcon />}
            >
              Dynamic Cora Form Page
            </Button>
          </Stack>
        </AsidePortal>
        <TabsMenu />
        <Stack spacing={2}>
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
