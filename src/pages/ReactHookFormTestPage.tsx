import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { Control, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Card } from '../components';
import {
  ControlledSelectField,
  ControlledTextField,
} from '../components/Controlled';
import { ActionButtonGroup } from '../components/FormGenerator/ActionButtonGroup';

const validationSchema = yup.object().shape({
  title: yup.object().shape({
    main: yup.object().shape({
      value: yup.string().required(),
    }),
    tagLine: yup.object().shape({
      value: yup.string().required(),
    }),
  }),
  author: yup.array().of(
    yup.object().shape({
      _gender: yup.string().required(),
      _color: yup.string().required(),
      name: yup.array().of(
        yup.object().shape({
          _title: yup.string().required(),
          firstName: yup.object().shape({
            _originCountry: yup.string().required(),
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
            <ControlledSelectField
              options={[
                { value: 'mr', label: 'Mr' },
                { value: 'mrs', label: 'Mrs' },
              ]}
              label={`${name}[${index}]._title`}
              name={`${name}[${index}]._title`}
              control={control}
              isLoading={false}
              loadingError={false}
            />

            <ControlledSelectField
              options={[
                { value: 'se', label: 'Sweden' },
                { value: 'us', label: 'USA' },
                { value: 'de', label: 'Germany' },
              ]}
              label={`${name}[${index}].firstName._originCountry`}
              name={`${name}[${index}].firstName._originCountry`}
              control={control}
              isLoading={false}
              loadingError={false}
            />

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
            _title: 'mrs',
            firstName: { value: 'new firstName', _originCountry: '' },
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
  const { fields, append, remove } = useFieldArray({ control, name });

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
            action={
              <ActionButtonGroup
                moveUpButtonDisabled={index === 0}
                moveUpButtonAction={() => console.log('')}
                moveDownButtonDisabled={index === fields.length - 1}
                moveDownButtonAction={() => console.log('')}
                deleteButtonDisabled={false}
                deleteButtonAction={() => remove(index)}
              />
            }
          >
            <ControlledSelectField
              control={control}
              isLoading={false}
              options={[
                { value: 'blue', label: 'Blue' },
                { value: 'yellow', label: 'Yellow' },
              ]}
              label={`${name}[${index}]._color` as const}
              name={`${name}[${index}]._color` as const}
              loadingError={false}
            />
            <ControlledSelectField
              control={control}
              isLoading={false}
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
              label={`${name}[${index}]._gender` as const}
              name={`${name}[${index}]._gender` as const}
              loadingError={false}
            />
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
        onClick={() =>
          append({
            _gender: 'male',
            _color: 'yellow',
            name: [
              {
                _title: 'mr',
                firstName: { value: 'New firstname', _originCountry: 'de' },
                lastName: { value: 'New last name' },
              },
            ],
          })
        }
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
      title: {
        main: { value: 'Moby Dick' },
        tagLine: { value: 'Call me Ishmael' },
      },
      author: [
        {
          _gender: '',
          _color: 'blue',
          name: [
            {
              _title: 'mr',
              firstName: { value: 'Egil', _originCountry: 'se' },
              lastName: { value: 'Baker' },
            },
          ],
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
            <ControlledTextField
              label='title.main.value'
              name='title.main.value'
              control={control}
            />
            <ControlledTextField
              label='title.tagLine.value'
              name='title.tagLine.value'
              control={control}
            />
            <NestedFieldArray
              control={control}
              name='author'
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <pre>{JSON.stringify(getValues(), null, 1)}</pre>
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
