import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Card } from '../components';
import { ControlledTextField } from '../components/Controlled';

const validationSchema = yup.object().shape({
  author: yup.array().of(
    yup.object().shape({
      name: yup.array().of(
        yup.object().shape({
          firstName: yup.object().shape({
            value: yup.string().required(),
          }),
          lastName: yup.object().shape({
            value: yup.string().required(),
          }),
        }),
      ),
    }),
  ),
});

interface NFProps {
  control: Control<any>;
  name: string;
}

const NestedNameFieldArray = (props: NFProps): JSX.Element => {
  const { control, name } = props;
  const { fields, append } = useFieldArray({ control, name });

  return (
    <div id={props.name}>
      {fields.map((field, index) => {
        return (
          <Card
            key={field.id}
            title={`${name} ${index}`}
            variant='variant2'
            tooltipTitle='title'
            tooltipBody='body'
          >
            <ControlledTextField
              label={`${name}[${index}].firstName.value`}
              name={`${name}[${index}].firstName.value`}
              control={control}
            />
            <ControlledTextField
              label={`${name}[${index}].lastName.value`}
              name={`${name}[${index}].lastName.value`}
              control={control}
            />
          </Card>
        );
      })}
      <Button
        sx={{ mt: 1, mb: 1 }}
        variant='outlined'
        fullWidth
        disableRipple
        onClick={() =>
          append({
            firstName: { value: 'new firstName' },
            lastName: { value: 'new lastName' },
          })
        }
      >
        Add {name}
      </Button>
    </div>
  );
};

const NestedFieldArray = (props: NFProps): JSX.Element => {
  const { control, name } = props;
  const { fields, append } = useFieldArray({ control, name });

  return (
    <div id={props.name}>
      {fields.map((field, index) => {
        return (
          <Card
            key={field.id}
            title={`${name} ${index}`}
            variant='variant1'
            tooltipTitle='title'
            tooltipBody='Some body text on how this form works'
          >
            <NestedNameFieldArray
              control={control}
              name={`${name}[${index}].name` as const}
            />
          </Card>
        );
      })}
      <Button
        sx={{ mt: 3, mb: 3 }}
        variant='outlined'
        color='info'
        fullWidth
        disableRipple
        onClick={() => append({})}
      >
        Add {name} (TODO: not correct append obj)
      </Button>
    </div>
  );
};

export const ReactHookFormTestPage = () => {
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      author: [
        {
          name: [
            { firstName: { value: 'Egil' }, lastName: { value: 'Baker' } },
          ],
        },
      ],
    },
  });

  const { formState, control, handleSubmit } = methods;

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((values) =>
        console.log(JSON.stringify(values, null, 1)),
      )}
    >
      <Card
        title='Test'
        variant='variant6'
        tooltipTitle='Title'
        tooltipBody='Here goes some text about how choose type'
      >
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid
            item
            xs={12}
            sm={12}
          >
            <NestedFieldArray
              control={control}
              name='author'
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              disabled={!formState.isValid}
              fullWidth
              type='submit'
              disableRipple
              variant='contained'
            >
              Submit form
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};
