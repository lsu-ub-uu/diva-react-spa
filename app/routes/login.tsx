import type { ActionFunction, LoaderFunctionArgs } from '@remix-run/node'; // or cloudflare/deno
import { json, redirect } from '@remix-run/node'; // or cloudflare/deno
import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { commitSession, getSession } from '@/.server/sessions';
import { Alert, Button, Stack } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { generateYupSchemaFromFormSchema } from '@/components/FormGenerator/validation/yupSchema';
import { createDefaultValuesFromFormSchema } from '@/components/FormGenerator/defaultValues/defaultValues';
import type { VariantType } from 'notistack';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { loginWithAppToken } from '@/.server/data/loginWithAppToken';
import { loginWithUsernameAndPassword } from '@/.server/data/loginWithUsernameAndPassword';
import type { Auth } from '@/types/Auth';
import type { ErrorBoundaryComponent } from '@remix-run/react/dist/routeModules';
import { RouteErrorBoundary } from '@/components/DefaultErrorBoundary/RouteErrorBoundary';
import { FormGenerator } from '@/components/FormGenerator/FormGenerator';

const parsePresentation = (searchParam: string | null) => {
  if (searchParam === null) {
    return null;
  }
  try {
    return JSON.parse(decodeURIComponent(searchParam));
  } catch {
    console.error('Failed to parse presentation search param', searchParam);
    return null;
  }
};

export const ErrorBoundary: ErrorBoundaryComponent = RouteErrorBoundary;

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('returnTo');
  const presentation = parsePresentation(url.searchParams.get('presentation'));

  const session = await getSession(request.headers.get('Cookie'));

  if (session.has('auth')) {
    return redirect(returnTo ?? '/');
  }

  const data = { presentation, error: session.get('error'), returnTo };
  return json(data, {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
}

const authenticate = async (form: FormData) => {
  const loginType = form.get('loginType');

  switch (loginType) {
    case 'appToken': {
      const account = form.get('account');
      return loginWithAppToken(JSON.parse(account!.toString()));
    }
    case 'webRedirect':
      return JSON.parse(form.get('auth')!.toString()) as Auth;
    case 'password':
      return await loginWithUsernameAndPassword(
        form.get('password.loginId.value')!.toString(),
        form.get('password.password.value')!.toString(),
      );
    default:
      return null;
  }
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get('Cookie'));
  const form = await request.formData();
  const returnToEncoded = form.get('returnTo');
  const returnTo =
    returnToEncoded && decodeURIComponent(returnToEncoded.toString());

  const presentationString = form.get('presentation');

  const auth = await authenticate(form);

  if (auth === null) {
    session.flash('error', 'Invalid credentials');

    // Redirect back to the login page with errors.
    return redirect(
      presentationString
        ? `/login?presentation=${encodeURIComponent(presentationString.toString())}`
        : (returnTo ?? '/'),
      {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      },
    );
  }

  session.set('auth', auth);
  return redirect(returnTo ?? '/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  });
};

export default function Login() {
  const { error, presentation, returnTo } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(presentation),
    resolver: yupResolver(generateYupSchemaFromFormSchema(presentation)),
  });
  const { handleSubmit } = methods;

  return (
    <div>
      {error ? <Alert severity='error'>{error}</Alert> : null}
      <Form
        method='POST'
        onSubmit={handleSubmit(
          (_values, event) => {
            submit(event!.target);
          },
          () => notification(t('divaClient_validationErrorsText'), 'error'),
        )}
      >
        <input
          type='hidden'
          name='loginType'
          value='password'
        />
        {returnTo && (
          <input
            type='hidden'
            name='returnTo'
            value={returnTo}
          />
        )}
        <input
          type='hidden'
          name='presentation'
          value={JSON.stringify(presentation)}
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
