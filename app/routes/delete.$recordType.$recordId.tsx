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

import { ActionFunctionArgs, data } from 'react-router';
import { deleteRecord } from '@/data/deleteRecord';
import { commitSession, getSessionFromCookie, requireAuthentication } from '@/sessions';
import { invariant } from '@react-router/router/history';

export const action = async ({
  request,
  params,
  context,
}: ActionFunctionArgs) => {
  const { recordType, recordId } = params;

  invariant(recordType, 'Missing recordType param');
  invariant(recordId, 'Missing recordId param');

  const session = await getSessionFromCookie(request);
  const auth = await requireAuthentication(session);

  await deleteRecord(context.dependencies, recordType, recordId, auth);

  session.flash('success', 'Successfully deleted record');
  return data(
    {},
    {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    },
  );
};
