import { FieldErrors } from 'react-hook-form';
import { Alert } from '@mui/material';

interface ErrorMessageProp {
  title?: string;
  errors: FieldErrors;
}

export const ErrorMessage = (props: ErrorMessageProp): JSX.Element | null => {
  if (Object.entries(props.errors).length < 1) return null;

  return (
    <Alert
      severity='error'
      sx={{ mb: 2 }}
    >
      <span>{props.title ?? 'Form validation error(s):'}</span>
      <pre>{JSON.stringify(props.errors, null, 2)}</pre>
      <ul>
        {props.errors &&
          Object.entries(props.errors).map(([field, err]) => (
            <li key={field}>{(err?.message ?? `${err}`).toString()}</li>
          ))}
      </ul>
    </Alert>
  );
};
