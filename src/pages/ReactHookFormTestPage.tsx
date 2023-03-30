import React, { useEffect } from 'react';
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  RadioGroup,
  Stack,
  TextField,
} from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorIcon from '@mui/icons-material/Error';
import * as dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  publicationTypeSelector,
  loadPublicationTypesAsync,
} from '../features/publicationTypes';
import {
  Card,
  Select,
  ErrorMessage,
  Radio,
  Checkbox,
  DatePicker,
  useBackdrop,
} from '../components';

interface TestModel {
  firstname: string;
  lastname: string;
  gender: string;
  publicationType: string;
  testCheck: boolean;
  pubDate: dayjs.Dayjs;
  authors: {
    name: string;
    age: number;
  }[];
}

const validationSchema = yup.object().shape({
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  gender: yup.string().required('Gender is required'),
  publicationType: yup.string().required('Publication type is required'),
  testCheck: yup.bool().oneOf([true], 'You need to tick testCheck'),
  pubDate: yup.date().typeError('Invalid Date').required('Date is required'),
  // eslint-disable-next-line react/forbid-prop-types
  authors: yup
    .array(
      yup.object({
        name: yup.string().trim().required('Author name is required'),
        age: yup.number().required('age is req'),
      }),
    )
    .min(1)
    .max(3),
});

export const ReactHookFormTestPage = () => {
  const methods = useForm<TestModel>({
    resolver: yupResolver(validationSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { fields, append, remove, move } = useFieldArray({
    name: 'authors',
    control,
  });
  const { setBackdrop } = useBackdrop();
  const dispatch = useAppDispatch();
  const publicationTypeState = useAppSelector(publicationTypeSelector);

  useEffect(() => {
    setBackdrop(true);
    dispatch(loadPublicationTypesAsync(() => setBackdrop(false)));
  }, [dispatch, setBackdrop]);

  const handleMove = (prev: number, next: number) => {
    move(prev, next);
  };

  const handleOnSubmit = (data: TestModel) => {
    console.log(data);
  };

  return (
    <Stack spacing={2}>
      <Card
        title='Publikationstyp'
        variant='variant6'
        tooltipTitle='Title'
        tooltipBody='Here goes some text about how choose type'
      >
        <ErrorMessage errors={errors} />
        <Box
          component='form'
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Grid
            container
            spacing={2}
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Controller
                control={control}
                name='firstname'
                defaultValue=''
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Firstname
                    </FormLabel>
                    <TextField
                      error={error !== undefined}
                      {...field}
                      autoComplete='off'
                      placeholder='firstname'
                      fullWidth
                      variant='outlined'
                      helperText={error !== undefined ? error.message : ' '}
                      InputProps={{
                        endAdornment: (
                          <ErrorIcon
                            sx={{
                              color: 'red',
                              visibility:
                                error !== undefined ? 'visible' : 'hidden',
                            }}
                          />
                        ),
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
            >
              <Controller
                control={control}
                name='lastname'
                defaultValue=''
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Lastname
                    </FormLabel>
                    <TextField
                      error={error !== undefined}
                      {...field}
                      autoComplete='off'
                      placeholder='Lastname Placeholder'
                      fullWidth
                      variant='outlined'
                      helperText={error !== undefined ? error.message : ' '}
                      InputProps={{
                        endAdornment: (
                          <ErrorIcon
                            sx={{
                              color: 'red',
                              visibility:
                                error !== undefined ? 'visible' : 'hidden',
                            }}
                          />
                        ),
                      }}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Controller
                control={control}
                name='gender'
                defaultValue='female'
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Gender
                    </FormLabel>
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value='female'
                        control={<Radio />}
                        label='Female'
                      />
                      <FormControlLabel
                        value='male'
                        control={<Radio />}
                        label='Male'
                      />
                      <FormControlLabel
                        value='other'
                        control={<Radio />}
                        label='Other'
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Controller
                control={control}
                defaultValue=''
                name='publicationType'
                render={({ field, fieldState: { error } }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Publication type
                    </FormLabel>
                    <Select
                      fullWidth
                      loadingError={publicationTypeState.isError}
                      error={error !== undefined}
                      {...field}
                      loading={publicationTypeState.isLoading}
                    >
                      {publicationTypeState.publicationTypes &&
                        publicationTypeState.publicationTypes.map((item) => {
                          return (
                            <MenuItem
                              key={`publication-type-${item.value}`}
                              disableRipple
                              value={item.value}
                            >
                              {item.label}
                            </MenuItem>
                          );
                        })}
                    </Select>
                    <FormHelperText error={error !== undefined}>
                      {error !== undefined ? error.message : ' '}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Controller
                control={control}
                name='testCheck'
                defaultValue
                render={({ field: { value, onChange, ...field } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        disableRipple
                        onChange={onChange}
                        checked={value}
                        {...field}
                      />
                    }
                    label='testCheck'
                  />
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Controller
                control={control}
                name='pubDate'
                defaultValue={dayjs()}
                render={({
                  field: { value, onChange, ...field },
                  fieldState: { error },
                }) => (
                  <FormControl fullWidth>
                    <FormLabel
                      required
                      error={error !== undefined}
                    >
                      Publication date
                    </FormLabel>
                    <DatePicker
                      value={value}
                      onChange={onChange}
                      error={error}
                      {...field}
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              {fields.map((field, index) => {
                return (
                  <div key={field.id}>
                    <section
                      className='section'
                      key={field.id}
                    >
                      <input placeholder='name' />
                      <input placeholder='age' />
                      <button
                        disabled={index === 0}
                        type='button'
                        onClick={() => handleMove(index, index - 1)}
                      >
                        UP
                      </button>
                      <button
                        disabled={index === fields.length - 1}
                        type='button'
                        onClick={() => handleMove(index, index + 1)}
                      >
                        DN
                      </button>
                      <button
                        type='button'
                        onClick={() => remove(index)}
                      >
                        X
                      </button>
                    </section>
                  </div>
                );
              })}
              <button
                type='button'
                onClick={() =>
                  append({
                    name: '',
                    age: 0,
                  })
                }
              >
                Add Author
              </button>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Button
                type='submit'
                disableRipple
                variant='contained'
                endIcon={<ArrowForwardIcon />}
              >
                Continue
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Stack>
  );
};
