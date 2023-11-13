/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React, { useEffect } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import { FieldValues } from 'react-hook-form';
import { useBackdrop, FormGenerator } from '../components';
import { useCoraFormSchemaByValidationType } from '../app/hooks';
import { FormSchema } from '../components/FormGenerator/types';
import {
  createDefaultValuesFromFormSchema,
  generateYupSchemaFromFormSchema,
} from '../components/FormGenerator/utils';
import { useSnackbar } from "notistack";

export const DynamicFormPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { setBackdrop } = useBackdrop();
  const { error, isLoading, schema } =
    useCoraFormSchemaByValidationType('manuscript');

  useEffect(() => {
    setBackdrop(isLoading);
  }, [isLoading, setBackdrop]);

  const handleSubmit = async (values: FieldValues) => {
    const response = await axios.post(
      `/record/${schema?.validationTypeId}`,
      values,
    );
    enqueueSnackbar(`Record was successfully created ${response.data.id}`, {
      variant: 'success',
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

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
          <FormGenerator
            onSubmit={handleSubmit}
            formSchema={schema as FormSchema}
          />
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
