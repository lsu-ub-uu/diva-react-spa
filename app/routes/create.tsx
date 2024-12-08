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
import { getRecordByValidationTypeId } from '@/.server/data/getRecordByValidationTypeId';
import { getFormDefinitionByValidationTypeId } from '@/.server/data/getFormDefinitionByValidationTypeId';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { getValidatedFormData } from 'remix-hook-form';
import { createRecord } from '@/.server/data/createRecord';
import { BFFDataRecord } from '@/types/record';
import {
  getSessionFromCookie,
  requireAuthentication,
} from '@/.server/sessions';
import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import {
  getResponseInitWithSession,
  redirectAndCommitSession,
} from '@/utils/redirectAndCommitSession';
import { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';

export const ErrorBoundary: ErrorBoundaryComponent = RouteErrorBoundary;

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
      data as unknown as BFFDataRecord,
      auth,
    );
    session.flash('success', `Record was successfully created ${id}`);
    return redirectAndCommitSession(`/update/${recordType}/${id}`, session);
  } catch (error) {
    console.error(error);
    session.flash('error', 'Failed to create record');
    return json(null, await getResponseInitWithSession(session));
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
    await getResponseInitWithSession(session),
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
