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

import { getSessionFromCookie, requireAuthentication } from '@/sessions';
import { getRecordByRecordTypeAndRecordId } from '@/data/getRecordByRecordTypeAndRecordId';
import { getFormDefinitionByValidationTypeId } from '@/data/getFormDefinitionByValidationTypeId';
import { DefaultErrorBoundary } from '@/components/DefaultErrorBoundary/DefaultErrorBoundary';
import { getCorrectTitle } from '@/partials/cards/ListPublicationsCard';
import { invariant } from '@/utils/invariant';
import type { Route } from '../../.react-router/types/app/routes/+types/viewRecord';
import { ViewRecordPage } from '@/pages/ViewRecordPage';

export const ErrorBoundary = DefaultErrorBoundary;

export const loader = async ({
  request,
  params,
  context,
}: Route.LoaderArgs) => {
  const session = await getSessionFromCookie(request);
  const auth = await requireAuthentication(session);

  const { recordType, recordId } = params;
  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');
  const record = await getRecordByRecordTypeAndRecordId(
    context.dependencies,
    recordType,
    recordId,
    auth.data.token,
  );
  const title = `${getCorrectTitle(record)} | DiVA`;

  invariant(record.validationType, 'Record has no validation type');
  const formDefinition = await getFormDefinitionByValidationTypeId(
    context.dependencies,
    record.validationType,
    'view',
  );

  return { record, formDefinition, title };
};

export const meta = ({ data }: Route.MetaArgs) => {
  return [{ title: data?.title }];
};

export default function ViewRecord({ loaderData }: Route.ComponentProps) {
  const { record, formDefinition } = loaderData;
  return (
    <ViewRecordPage
      record={record}
      formDefinition={formDefinition}
    />
  );
}
