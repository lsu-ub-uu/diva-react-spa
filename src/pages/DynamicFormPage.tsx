import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Stack } from '@mui/material';
import { Card, FormGenerator } from '../components';
import { FormSchema } from '../components/FormGenerator/types';
import { createDefaultValuesFromFormSchema } from '../components/FormGenerator/utils';
import {
  formDefBookWithTitleGroupAndAuthorGroupsWithNameGroups,
} from '../__mocks__/data/formDef';

export const DynamicFormPage = () => {
  const { t } = useTranslation();
  const schema =
    formDefBookWithTitleGroupAndAuthorGroupsWithNameGroups as FormSchema;

  return (
    <>
      <Helmet>
        <title>{t('Name of form')} | DiVA</title>
      </Helmet>
      <div>
        <Stack spacing={2}>
          <Card
            title='CORA forms'
            variant='variant6'
            tooltipTitle='New dynamic cora forms'
            tooltipBody='Some body text on how this form works'
          >
            <FormGenerator
              onSubmit={(values) =>
                console.log(JSON.stringify(values, null, 2))
              }
              formSchema={schema as FormSchema}
            />
          </Card>
          <p>Cora Form Definition:</p>
          <pre>{JSON.stringify(schema, null, 2)}</pre>
          <p>Default values:</p>
          <pre>
            {JSON.stringify(createDefaultValuesFromFormSchema(schema), null, 2)}
          </pre>
        </Stack>
      </div>
    </>
  );
};
