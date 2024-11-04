import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'; // or cloudflare/deno
import { json, redirect } from '@remix-run/node'; // or cloudflare/deno
import { Form, useLoaderData } from '@remix-run/react';
import { commitSession, getSession } from '@/sessions';
import {
  Account,
  devAccounts,
} from '@/components/Layout/Header/Login/devAccounts';
import axios from 'axios';
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
} from '@mui/material';

async function appTokenLogin(account: Account) {
  const response = await axios.post(
    '/auth/appToken',
    { user: account.idFromLogin, appToken: account.appToken },
    { headers: { 'Content-Type': 'application/json' } },
  );
  return response.data.auth;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('auth')) {
    // Redirect to the home page if they are already signed in.
    return redirect('/');
  }

  const data = { error: session.get('error') };

  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const form = await request.formData();
  const userId = form.get('userId');
  const account = devAccounts.find((user) => user.userId === userId);
  const auth = await appTokenLogin(account!);

  if (auth == null) {
    session.flash('error', 'Invalid username/password');

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
  const { error } = useLoaderData<typeof loader>();

  return (
    <div>
      {error ? <div className='error'>{error}</div> : null}
      <Form method='POST'>
        <div>
          <p>Please sign in</p>
        </div>
        <FormLabel sx={{ alignSelf: 'center' }}>
          Sign in with app token
        </FormLabel>
        <FormControl
          sx={{
            display: 'flex',
            flexDirection: 'row',

            gap: 1,
          }}
        >
          <Select
            name='userId'
            defaultValue={devAccounts[0].userId}
            variant='outlined'
          >
            {devAccounts.map(({ userId, firstName, lastName }) => (
              <MenuItem
                value={userId}
                key={userId}
              >
                {firstName} {lastName}
              </MenuItem>
            ))}
          </Select>
          <Button
            type='submit'
            variant='contained'
          >
            Log in
          </Button>
        </FormControl>
      </Form>
    </div>
  );
}
