import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';
import { Card, useBackdrop, FormGenerator } from '../components';
import { useCoraFormSchemaByValidationType } from '../app/hooks';
import { FormSchema } from '../components/FormGenerator/types';
import {
  createDefaultValuesFromFormSchema,
  generateYupSchemaFromFormSchema,
} from '../components/FormGenerator/utils';

export const DynamicFormPage = () => {
  const { t } = useTranslation();
  const { setBackdrop } = useBackdrop();
  const { error, isLoading, schema } =
    useCoraFormSchemaByValidationType('demo');

  useEffect(() => {
    setBackdrop(isLoading);
  }, [isLoading, setBackdrop]);

  if (error) return <Alert severity='error'>{error}</Alert>;
  if (isLoading)
    return (
      <Skeleton
        variant='rectangular'
        height={800}
      />
    );

  return (
    <>
      <Helmet>
        <title>{t('Name of form')} | DiVA</title>
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
          <p>Form def:</p>
          <pre>{JSON.stringify(schema, null, 2)}</pre>
          <p>Default values:</p>
          <pre>
            {JSON.stringify(
              schema && createDefaultValuesFromFormSchema(schema),
              null,
              2,
            )}
          </pre>
          <p>YUP validations:</p>
          <pre>
            {JSON.stringify(
              schema && generateYupSchemaFromFormSchema(schema).describe(),
              null,
              2,
            )}
          </pre>
        </Stack>
      </div>
    </>
  );
};
