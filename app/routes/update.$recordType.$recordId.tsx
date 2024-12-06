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

import { UpdateRecordPage } from '@/pages';

import {
  commitSession,
  getSessionFromCookie,
  requireAuthentication,
} from '@/.server/sessions';
import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  MetaFunction,
} from '@remix-run/node';
import { getRecordByRecordTypeAndRecordId } from '@/.server/data/getRecordByRecordTypeAndRecordId';
import { invariant } from '@remix-run/router/history';
import { getFormDefinitionByValidationTypeId } from '@/.server/data/getFormDefinitionByValidationTypeId';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { getValidatedFormData, parseFormData } from 'remix-hook-form';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { updateRecord } from '@/.server/data/updateRecord';
import { BFFDataRecord } from '@/types/record';
import { getResponseInitWithSession } from '@/utils/redirectAndCommitSession';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { DefaultErrorBoundary } from '@/components/DefaultErrorBoundary/DefaultErrorBoundary';
import { getCorrectTitle } from '@/partials/cards/ListPublicationsCard';

export const ErrorBoundary: ErrorBoundaryComponent = DefaultErrorBoundary;

export const action = async ({
  request,
  params,
  context,
}: ActionFunctionArgs) => {
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
    return json({ errors, defaultValues });
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

  return json(null, await getResponseInitWithSession(session));
};

export async function loader({ request, params, context }: LoaderFunctionArgs) {
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

  return json(
    { record, formDefinition, defaultValues, successMessage, title },
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: data?.title }];
};

export default function UpdateRecordRoute() {
  const { record, formDefinition, successMessage } =
    useLoaderData<typeof loader>();

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
