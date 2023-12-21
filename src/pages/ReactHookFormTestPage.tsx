import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Card } from '../components';
import { ControlledTextField } from '../components/Controlled';

const validationSchema = yup.object().shape({
  nationalSubjectCategory: yup
    .array()

    // .test('testName', 'error', (array) => {
    //   return array?.length === 0;
    // })
    .min(2)
    .of(
      yup.object().shape({
        value: yup
          .string()
          .nullable()
          .transform((value) => (value === '' ? null : value))
          .when('$isNotNull', (isNotNull, field) =>
            isNotNull
              ? // eslint-disable-next-line prefer-regex-literals
                field.matches(new RegExp('.+'), 'Invalid input format')
              : field,
          ),
      }),
    ),
});

/* nationalSubjectCategory är en array som innehåller object 
   där repeatMin som bestämmer hur många som ska vara required.
   min number to show bestämmer hur många som ska visas
   de som inte är required är optional
*/

interface NFProps {
  control: Control<any>;
  name: string;
}

const NestedFieldArray = (props: NFProps): JSX.Element => {
  const { control, name } = props;
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div id={props.name}>
      {fields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            <ControlledTextField
              key={field.id}
              label='nationalSubjectCategory.value'
              name={`nationalSubjectCategory[${index}].value`}
              control={control}
            />
            <Button
              sx={{ mt: 3, mb: 3 }}
              variant='outlined'
              color='info'
              fullWidth
              disableRipple
              disabled={fields.length >= 5}
              onClick={() => remove(index)}
            >
              Remove
            </Button>
          </React.Fragment>
        );
      })}
      <Button
        sx={{ mt: 3, mb: 3 }}
        variant='outlined'
        color='info'
        fullWidth
        disableRipple
        disabled={fields.length >= 5}
        onClick={() =>
          append({
            value: '',
          })
        }
      >
        Add {name}
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
      nationalSubjectCategory: [
        {
          value: '',
        },
      ],
    },
  });

  const { getValues, formState, control, handleSubmit } = methods;

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((values) =>
        console.log(JSON.stringify(values, null, 1)),
      )}
    >
      <Stack>
        <Card
          title='Book'
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
                name='nationalSubjectCategory'
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <pre>{JSON.stringify(getValues(), null, 1)}</pre>
              <Button
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
      </Stack>
    </Box>
  );
};
