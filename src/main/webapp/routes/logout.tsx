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

import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { destroySession, getSession } from '@/sessions';

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const form = await request.formData();
  const returnTo = decodeURIComponent(form.get('returnTo')!.toString());

  return redirect(returnTo ?? '/', {
    // TODO logout from cora
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}

export const loader = async () => redirect('/');