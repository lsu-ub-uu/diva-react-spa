/*
 * Copyright 2024 Uppsala University Library
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

import {
  commitSession,
  getSessionFromCookie,
  requireAuthentication,
} from '@/.server/sessions';
import { data, useNavigation } from 'react-router';
import { getRecordByRecordTypeAndRecordId } from '@/.server/data/getRecordByRecordTypeAndRecordId';
import { getFormDefinitionByValidationTypeId } from '@/.server/data/getFormDefinitionByValidationTypeId';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { getValidatedFormData, parseFormData } from 'remix-hook-form';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateRecord } from '@/.server/data/updateRecord';
import type { BFFDataRecord } from '@/types/record';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { getCorrectTitle } from '@/partials/cards/ListPublicationsCard';
import { invariant } from '@/utils/invariant';
import type { Route } from '../../.react-router/types/app/routes/+types/updateRecord';
import { UpdateRecordPage } from '@/pages/UpdateRecordPage';

export const ErrorBoundary = RouteErrorBoundary;

export const action = async ({
  request,
  params,
  context,
}: Route.ActionArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuthentication(session);
  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');
  const formData = await request.formData();
  const parsedFormData = (await parseFormData(formData)) as any;
  const validationType =
    parsedFormData.output?.recordInfo?.validationType?.value;
  invariant(validationType, 'Failed to extract validationType from form data');
  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    validationType,
    'update',
  );
  const resolver = yupResolver(generateYupSchemaFromFormSchema(formDefinition));
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData(formData, resolver);

  if (errors) {
    return { errors, defaultValues };
  }

  try {
    await updateRecord(
      context.dependencies,
      validationType,
      recordId,
      data as unknown as BFFDataRecord,
      auth,
    );
    session.flash('success', `Record was successfully updated`);
  } catch (error) {
    console.error(error);
    session.flash('error', 'Failed to create record');
  }

  return data(null, await getResponseInitWithSession(session));
};

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuthentication(session);
  const { t } = context.i18n;

  const successMessage = session.get('success');

  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');

  const record = await getRecordByRecordTypeAndRecordId(
    context.dependencies,
    recordType,
    recordId,
    auth.data.token,
  );

  const title = `${t('divaClient_UpdatingPageTitleText')} ${getCorrectTitle(record)} | DiVA`;

  if (record?.validationType == null) {
    throw new Error();
  }
  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    record.validationType,
    'update',
  );

  const defaultValues = createDefaultValuesFromFormSchema(
    formDefinition,
    record,
  );

  return data(
    { record, formDefinition, defaultValues, successMessage, title },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};

export default function UpdateRecord({ loaderData }: Route.ComponentProps) {
  const { record, formDefinition, successMessage } = loaderData;

  const navigation = useNavigation();

  useEffect(() => {
    if (successMessage && navigation.state === 'idle') {
      enqueueSnackbar(successMessage, {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
        preventDuplicate: true,
      });
    }
  }, [successMessage, navigation.state]);

  return (
    <UpdateRecordPage
      record={record}
      formDefinition={formDefinition}
    />
  );
}
