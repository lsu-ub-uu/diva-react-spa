import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'; // or cloudflare/deno
import { json, redirect } from '@remix-run/node'; // or cloudflare/deno
import { Form, useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '@/sessions';
import { Account } from '@/components/Layout/Header/Login/devAccounts';
import axios from 'axios';
import { Button, Stack } from '@mui/material';
import { Auth } from '@/features/auth/authSlice';
import { FormGenerator } from '@/components';
import { FormProvider, useForm } from 'react-hook-form';

async function appTokenLogin(account: Account) {
  const response = await axios.post(
    '/auth/appToken',
    { user: account.idFromLogin, appToken: account.appToken },
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data.auth;
}

const usernamePasswordLogin = async (loginId: string, password: string) => {
  try {
    const response = await axios.post(
      `/auth/password`,
      { user: loginId, password },
      {
        headers: { 'Content-Type': 'application/json' },
      },
    );
    return response.data.authToken;
  } catch (e) {
    console.error(e);
  }
};

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const presentationString = url.searchParams.get('presentation');
  const presentation =
    presentationString && JSON.parse(decodeURIComponent(presentationString));
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('auth')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/');
  }

  const data = { presentation, error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const form = await request.formData();

  const loginType = form.get('loginType');
  console.log({ loginType });
  let auth: Auth | null = null;
  if (loginType === 'appToken') {
    const account = form.get('account');
    auth = await appTokenLogin(JSON.parse(account!.toString()));
  } else if (loginType === 'webRedirect') {
    auth = JSON.parse(form.get('auth')!.toString());
  } else if (loginType === 'password') {
    auth = await usernamePasswordLogin(
      form.get('password.loginId.value')!.toString(),
      form.get('password.password.value')!.toString(),
    );
  }

  if (auth == null) {
    session.flash('error', 'Invalid credentials');

    // Redirect back to the login page with errors.
    return redirect('/login', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  }

  session.set('auth', auth);
  // Login succeeded, send them to the home page.
  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export default function Login() {
  const { error, presentation } = useLoaderData<typeof loader>();

  const methods = useForm();
  return (
    <div>
      {error ? <div className='error'>{error}</div> : null}
      <Form method='POST'>
        <input
          type='hidden'
          name='loginType'
          value='password'
        />
        <Stack spacing={2}>
          {presentation !== null ? (
            <FormProvider {...methods}>
              <FormGenerator formSchema={presentation} />
            </FormProvider>
          ) : (
            <span />
          )}
        </Stack>
        <Button
          type='submit'
          variant='contained'
        >
          Logga in
        </Button>
      </Form>
    </div>
  );
}
