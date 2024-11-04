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

// app/sessions.ts
import { createCookieSessionStorage } from '@remix-run/node';
import { Auth } from '@/features/auth/authSlice';

type SessionData = {
  auth: Auth;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    // a Cookie from `createCookie` or the CookieOptions to create one
    cookie: {
      name: '__session',
      domain: 'localhost',
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8h
      path: '/',
      sameSite: 'lax',
      secrets: ['s3cret1'],
      secure: import.meta.env.PROD,
    },
  });

async function getAuth(request: Request) {
  const session = await getSession(request.headers.get('Cookie'));
  return session.get('auth');
}

export { getSession, commitSession, destroySession, getAuth };
