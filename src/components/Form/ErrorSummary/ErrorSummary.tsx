import { FieldErrors } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Alert } from '@mui/material';

interface ErrorSummaryProps {
  title?: string;
  errors: FieldErrors;
}

export const ErrorSummary = (props: ErrorSummaryProps) => {
  if (Object.keys(props.errors).length === 0) {
    return null;
  }

  return (
    <Alert
      severity='error'
      sx={{ mb: 2 }}
    >
      <span>{props.title ?? 'Form validation error(s):'}</span>
      <ul>
        {Object.entries(props.errors).map(([fieldName, errors]) => {
          if (errors instanceof Array) {
            return errors.map((error, index) => {
              if (!error) return null;
              return Object.entries(error).flatMap(([subFieldName]) => {
                return (
                  <ErrorMessage
                    errors={props.errors}
                    name={`${fieldName}.${index}.${subFieldName}`}
                    key={`${fieldName}-${index}-${subFieldName}`}
                    as='li'
                  />
                );
              });
            });
          }
          return (
            <ErrorMessage
              errors={props.errors}
              name={fieldName as string}
              as='li'
              key={fieldName}
            />
          );
        })}
      </ul>
    </Alert>
  );
};
