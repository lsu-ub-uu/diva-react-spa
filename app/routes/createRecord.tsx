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

import { data } from 'react-router';
import CreateRecordPage from '@/pages/CreateRecordPage';
import { getRecordByValidationTypeId } from '@/.server/data/getRecordByValidationTypeId';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { getValidatedFormData } from 'remix-hook-form';
import { createRecord } from '@/.server/data/createRecord';
import type { BFFDataRecord } from '@/types/record';
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
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { invariant } from '@/utils/invariant';
import type { Route } from '../../.react-router/types/app/routes/+types/createRecord';
import { getFormDefinitionByValidationTypeId } from '@/.server/data/getFormDefinitionByValidationTypeId';

export const ErrorBoundary = RouteErrorBoundary;

export const action = async ({ context, request }: Route.ActionArgs) => {
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
    return { errors, defaultValues };
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
    return data(null, await getResponseInitWithSession(session));
  }
};

export const loader = async ({ request, context }: Route.LoaderArgs) => {
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
  return data(
    { record, formDefinition, errorMessage },
    await getResponseInitWithSession(session),
  );
};

export default function CreateRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { record, formDefinition, errorMessage } = loaderData;

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
