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
import { type ActionFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import CreateRecordPage from '@/pages/CreateRecordPage';
import { getRecordByValidationTypeId } from '@/data/getRecordByValidationTypeId';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { getValidatedFormData } from 'remix-hook-form';
import { createRecord } from '@/data/createRecord';
import { cleanFormData } from '@/utils/cleanFormData';
import { CoraRecord } from '@/types/record';
import {
  commitSession,
  getSessionFromCookie,
  requireAuthentication,
} from '@/sessions';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { redirectAndCommitSession } from '@/utils/redirectAndCommitSession';

export const action = async ({ context, request }: ActionFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuthentication(session);

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');

  invariant(validationTypeId, 'Missing validationTypeId param');

  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    validationTypeId,
    'create',
  );
  const yupSchema = generateYupSchemaFromFormSchema(formDefinition);
  const resolver = yupResolver(yupSchema);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData(request, resolver);
  console.log({ data, errors });
  if (errors) {
    return json({ errors, defaultValues });
  }
  try {
    const { recordType, id } = await createRecord(
      context.dependencies,
      formDefinition,
      cleanFormData(data) as CoraRecord,
      auth,
    );
    session.flash('success', `Record was successfully created ${id}`);
    return redirectAndCommitSession(`/update/${recordType}/${id}`, session);
  } catch (error) {
    console.error(error);
    session.flash('error', 'Failed to create record');
    return redirectAndCommitSession(url.pathname + url.search, session);
  }
};

export const loader = async ({ request, context }: ActionFunctionArgs) => {
  const session = await getSessionFromCookie(request);
  const errorMessage = session.get('error');

  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');
  invariant(validationTypeId, 'Missing validationTypeId param');
  const record = getRecordByValidationTypeId(
    context.dependencies,
    validationTypeId,
  );
  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    validationTypeId,
    'create',
  );
  return json(
    { record, formDefinition, errorMessage },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
};

export default function CreateRecordRoute() {
  const { record, formDefinition, errorMessage } =
    useLoaderData<typeof loader>();

  useEffect(() => {
    if (errorMessage) {
      enqueueSnackbar(errorMessage, {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        preventDuplicate: true,
      });
    }
  }, [errorMessage]);

  return (
    <CreateRecordPage
      record={record}
      formDefinition={formDefinition}
    />
  );
}
