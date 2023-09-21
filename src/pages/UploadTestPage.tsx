import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { Card, useBackdrop, FormGenerator, FormSchema } from '../components';
import { useCoraFormSchemaByValidationType } from '../app/hooks';

export const UploadTestPage = () => {
  const { t } = useTranslation();
  const { setBackdrop } = useBackdrop();
  const { error, isLoading, schema } =
    useCoraFormSchemaByValidationType('demo');

  useEffect(() => {
    setBackdrop(isLoading);
  }, [isLoading, setBackdrop]);

  if (error) return <span>Error: {error}</span>;
  if (isLoading) return <span>Loading form from cora...</span>;

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
            tooltipTitle='Tooltip title'
            tooltipBody='Some body text on how this form works'
          >
            <FormGenerator
              onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
              formSchema={schema as FormSchema}
            />
          </Card>
          <pre>{JSON.stringify(schema, null, 2)}</pre>
        </Stack>
      </div>
    </>
  );
};
