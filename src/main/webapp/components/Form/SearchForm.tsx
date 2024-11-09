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

import { Button } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  createDefaultValuesFromFormSchema,
  RecordData,
} from '../FormGenerator/defaultValues/defaultValues';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { FormGenerator } from '@/components';
import { SearchFormSchema } from '../FormGenerator/types';
import { CoraRecord } from '@/features/record/types';
import { useTranslation } from 'react-i18next';
import { Form } from '@remix-run/react';
import { useSnackbar, VariantType } from 'notistack';

interface SearchFormProps {
  searchType: string;
  record?: CoraRecord;
  formSchema: SearchFormSchema;
}

export const SearchForm = ({
  searchType,
  record,
  formSchema,
}: SearchFormProps) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      formSchema,
      record?.data as RecordData,
    ),
    resolver: yupResolver(generateYupSchemaFromFormSchema(formSchema)),
  });
  const { handleSubmit } = methods;

  return (
    <Form
      method='GET'
      action={`/search/${searchType}`}
    >
      <FormProvider {...methods}>
        <FormGenerator formSchema={formSchema} />
      </FormProvider>
      <Button
        type='submit'
        disableRipple
        variant='contained'
        color='secondary'
        sx={{ height: 40 }}
      >
        {t('divaClient_SearchButtonText')}
      </Button>
    </Form>
  );
};
