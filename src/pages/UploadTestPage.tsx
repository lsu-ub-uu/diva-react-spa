import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Stack } from '@mui/material';
import { Card, FileUpload } from '../components';

export const UploadTestPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('Upload Test page')} | DiVA</title>
      </Helmet>
      <div>
        <Stack spacing={2}>
          <Card
            title='Upload File'
            variant='variant6'
            tooltipTitle='File upload instructions'
            tooltipBody='Some body text on how upload works goes here'
          >
            <FileUpload />
          </Card>
        </Stack>
      </div>
    </>
  );
};
