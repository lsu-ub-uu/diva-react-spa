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

import { getAuth } from '@/sessions';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId';
import { invariant } from '@remix-run/router/history';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId';
import { useLoaderData } from '@remix-run/react';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');

  const auth = await getAuth(request);
  if (!auth) {
    // Show error boundary
    throw json('Unauthorized', { status: 401 });
  }
  const record = await getRecordByRecordTypeAndRecordId(
    recordType,
    recordId,
    auth.data.token,
  );

  if (record?.validationType == null) {
    throw new Error();
  }
  const formDefinition = await getFormDefinitionByValidationTypeId(
    record.validationType,
    'update',
  );

  return { record, formDefinition };
}

export default function UpdateRecordRoute() {
  const { record, formDefinition } = useLoaderData<typeof loader>();
  return (
    <UpdateRecordPage
      record={record}
      formDefinition={formDefinition}
    />
  );
}
