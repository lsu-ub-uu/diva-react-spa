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
import { type ActionFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import CreateRecordPage from '@/pages/CreateRecordPage';
import { getRecordByValidationTypeId } from '@/data/getRecordByValidationTypeId';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId';

export const loader = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const validationTypeId = url.searchParams.get('validationType');
  invariant(validationTypeId, 'Missing validationTypeId param');
  const record = await getRecordByValidationTypeId(validationTypeId);
  const formDefinition = await getFormDefinitionByValidationTypeId(
    validationTypeId,
    'create',
  );
  return { record, formDefinition };
};

export default function CreateRecordRoute() {
  const { record, formDefinition } = useLoaderData<typeof loader>();

  return (
    <CreateRecordPage
      record={record}
      formDefinition={formDefinition}
    />
  );
}
