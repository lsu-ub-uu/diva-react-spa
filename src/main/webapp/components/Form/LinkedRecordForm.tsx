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
 */

import { FormProvider, useForm } from 'react-hook-form';
import {
  createDefaultValuesFromFormSchema,
  RecordData,
} from '@/components/FormGenerator/defaultValues/defaultValues';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { FormGenerator } from '@/components';
import { FormSchema } from '@/components/FormGenerator/types';
import { CoraRecord } from '@/types/record';

interface LinkedRecordFormProps {
  record: CoraRecord;
}

export const LinkedRecordForm = ({ record }: LinkedRecordFormProps) => {
  const formSchema = record.presentation as FormSchema;

  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(
      formSchema as FormSchema,
      record.data as RecordData,
    ),
    resolver: yupResolver(
      generateYupSchemaFromFormSchema(formSchema as FormSchema),
    ),
  });

  return (
    formSchema?.form && (
      <FormProvider {...methods}>
        <FormGenerator
          formSchema={record.presentation as FormSchema}
          linkedData
        />
      </FormProvider>
    )
  );
};
