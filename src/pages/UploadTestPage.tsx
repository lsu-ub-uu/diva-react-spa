import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { Stack } from '@mui/material';
import { Card } from '../components';
import {
  FormGenerator,
  FormSchema,
} from '../components/FormGenerator/FormGenerator';
import { formDef } from '../__mocks__/data/formDef';

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
            title='Form from Cora'
            variant='variant6'
            tooltipTitle='File upload instructions'
            tooltipBody='Some body text on how upload works goes here'
          >
            <FormGenerator
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
              formSchema={formDef as FormSchema}
            />
          </Card>
        </Stack>
      </div>
    </>
  );
};
