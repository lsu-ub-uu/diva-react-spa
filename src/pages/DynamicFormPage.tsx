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
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Skeleton,
  Stack,
  Step,
  StepButton,
  Stepper,
} from '@mui/material';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';
import { FieldValues } from 'react-hook-form';
import { useBackdrop, FormGenerator, AsidePortal } from '../components';
import { useCoraFormSchemaByValidationType } from '../app/hooks';
import { FormSchema } from '../components/FormGenerator/types';
import {
  createDefaultValuesFromFormSchema,
  generateYupSchemaFromFormSchema,
} from '../components/FormGenerator/utils';

export const DynamicFormPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setBackdrop } = useBackdrop();
  const { error, isLoading, schema } =
    useCoraFormSchemaByValidationType('manuscript');

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  useEffect(() => {
    setBackdrop(isLoading || isSubmitting);
  }, [isLoading, setBackdrop, isSubmitting]);

  const handleSubmit = async (values: FieldValues) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `/record/${schema?.validationTypeId}`,
        values,
      );
      notification(
        `Record was successfully created ${response.data.id}`,
        'success',
      );
    } catch (err: any) {
      setIsSubmitting(false);
      notification(`${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
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
      <AsidePortal>
        <Stepper
          sx={{
            '& .MuiStepper-root': {
              width: 'inherit',
              height: 'inherit',
            },
            '& .MuiSvgIcon-root': {
              borderRadius: '50%',
              stroke: '#613985',
              strokeWidth: '3px',
            },
            '& .MuiSvgIcon-root:not(.Mui-completed)': {
              color: 'white',
            },
            '& .MuiStepIcon-text': {
              fill: '#613985',
              display: 'none',
            },
            '& .MuiSvgIcon-root.Mui-active': {
              color: '#613985',
              stroke: '#613985',
              strokeWidth: '3px',
            },
            '& .MuiSvgIcon-root.Mui-completed': {
              color: '#c1b3ce',
              stroke: '#c1b3ce',
              strokeWidth: '3px',
            },
          }}
          orientation='vertical'
          nonLinear
          activeStep={5}
        >
          {schema?.form.components?.map((item) => (
            <Step key={item.name}>
              <StepButton
                disableRipple
                href='#'
              >
                {t(item.label as string) as string}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </AsidePortal>
      <Helmet>
        <title>{t('Name of form')} | DiVA</title>
      </Helmet>
      <div>
        <Stack spacing={2}>
          <FormGenerator
            onSubmit={handleSubmit}
            onInvalid={() => notification(`Form is invalid`, 'error')}
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
