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

import { Box, Container, Grid, Toolbar } from '@mui/material';
import { FieldErrors, FieldValues, useForm } from 'react-hook-form';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  createDefaultValuesFromFormSchema,
  RecordData,
} from '../FormGenerator/utils';
import { generateYupSchemaFromFormSchema } from '../FormGenerator/utils/yupSchema';
import { FormGenerator } from '@/components';
import { FormSchema } from '../FormGenerator/types';
import { CoraRecord } from '@/features/record/types';

interface SearchFormProps {
  record?: CoraRecord;
  formSchema: FormSchema;
  onSubmit: (formValues: FieldValues) => void;
  onInvalid?: (fieldErrors: FieldErrors) => void;
}

export const SearchForm = ({ ...props }: SearchFormProps) => {
  const { t } = useTranslation();

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      props.formSchema,
      props.record?.data as RecordData,
    ),
    resolver: yupResolver(generateYupSchemaFromFormSchema(props.formSchema)),
  });
  const { control, handleSubmit, reset, getValues } = methods;

  return (
    <Box
      component='form'
      sx={{ width: '100%' }}
      onSubmit={handleSubmit(
        (values) => props.onSubmit(values),
        (errors) => props.onInvalid && props.onInvalid(errors),
      )}
    >
      <FormGenerator
        formSchema={props.formSchema}
        onSubmit={props.onSubmit}
        onInvalid={props.onInvalid}
        control={control}
        getValues={getValues}
      />
      <Button
        disableRipple
        variant='contained'
        color='secondary'
        sx={{ height: 40 }}
        onClick={() => reset()}
      >
        Sök
      </Button>
    </Box>
  );
};
