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

import { invariant } from '@remix-run/router/history';
import { LoaderFunctionArgs } from '@remix-run/node';
import axios from 'axios';
import { CoraRecord } from '@/webapp/app/hooks';
import { useLoaderData } from '@remix-run/react';
import CreateRecordPage from '@/webapp/pages/CreateRecordPage';
import { FormSchema } from '@/webapp/components/FormGenerator/types';

const getRecordByValidationTypeId = async (validationTypeId: string) => {
  const response = await axios.get<CoraRecord>(`/record/${validationTypeId}`);
  return response.data as CoraRecord;
};

const getFormDefinitionByValidationTypeId = async (
  validationTypeId: string,
  mode: 'create' | 'update' | 'view',
) => {
  const response = await axios.get(`/form/${validationTypeId}/${mode}`);
  return response.data as FormSchema;
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { validationTypeId } = params;
  invariant(validationTypeId, 'Missing validationTypeId param');
  const record = await getRecordByValidationTypeId(validationTypeId);
  const formDefinition = await getFormDefinitionByValidationTypeId(
    validationTypeId,
    'create',
  );
  return { record, formDefinition };
};

export default function CreateRecord() {
  const { record, formDefinition } = useLoaderData<typeof loader>();

  return (
    <CreateRecordPage
      record={record}
      formDefinition={formDefinition}
    />
  );
}
