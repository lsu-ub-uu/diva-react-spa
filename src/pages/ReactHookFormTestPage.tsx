import React, { useEffect } from 'react';
import {
  Box,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  Stack,
} from '@mui/material';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  publicationTypeSelector,
  loadPublicationTypesAsync,
} from '../features/publicationTypes';
import {
  Card,
  useBackdrop,
  ErrorSummary,
  ResearchSubjectPicker,
  Option,
} from '../components';
import {
  ControlledTextField,
  ControlledSelectField,
  ControlledMultiCheckboxField,
  ControlledRadioButtons,
  ControlledDateTimePicker,
  ControlledEditor,
} from '../components/Controlled';

interface TestModel {
  publicationType: string;
  authors: {
    firstname: string;
    lastname: string;
    birthYear: string;
    deathYear: string;
    localUserId: string;
    orcidId: string;
    organisation: string;
    researchGroup: string;
    email: string;
    otherOrganisation: string;
  }[];
  researchSubjects: string[];
}

const validationSchema = yup.object().shape({
  title: yup.string().trim().required(),
  startDateTime: yup.date().typeError('Invalid Date!'),
  radioValue: yup.string().trim().required(),
  checkboxValues: yup.array().of(yup.string()).min(1).max(2),
  publicationType: yup.string().required('Publication type is required'),
  // eslint-disable-next-line react/forbid-prop-types
  authors: yup
    .array()
    .of(
      yup.object().shape({
        firstname: yup
          .string()
          .trim()
          .matches(/[A-Za-z]{3}/),
        lastname: yup.string().trim().required(),
        birthYear: yup.string().matches(/^(?:\d{4})?$/),
        deathYear: yup.string().matches(/^(?:\d{4})?$/),
        localUserId: yup.string().trim(),
        organisation: yup.string().trim().required(),
        orcidId: yup.string().trim(),
        researchGroup: yup.string().trim().required(),
        email: yup.string().email(),
        otherOrganisation: yup.string().trim(),
      }),
    )
    .min(1)
    .max(3),
  // researchSubjects: yup.array().of(yup.string()).min(1).max(4),
});

export const ReactHookFormTestPage = () => {
  const { t } = useTranslation();
  const methods = useForm({
    shouldFocusError: false,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '<p>this is the title</p>',
      startDateTime: '2001-09-01 16:30',
      radioValue: '',
      checkboxValues: [],
      publicationType: '',
      researchSubjects: [],
      authors: [
        {
          firstname: '',
          lastname: '',
          birthYear: '',
          deathYear: '',
          localUserId: '',
          orcidId: '',
          organisation: '',
          researchGroup: '',
          email: '',
          otherOrganisation: '',
        },
      ],
    },
  });
  const {
    control,
    trigger,
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

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
    await trigger();
  };

  const handleRemove = async (index: number) => {
    remove(index);
    await trigger();
  };

  const handleOnSubmit = (data: TestModel) => {
    console.log(data);
  };

  const optionsTest: Option[] = [
    {
      label: 'Option 1',
      value: '1',
      disabled: true,
    },
    {
      label: 'Option 2',
      value: '2',
    },
    {
      label: 'Option 3',
      value: '3',
    },
    {
      label: 'Option 4',
      value: '4',
    },
  ];

  // @ts-ignore
  return (
    <>
      <Helmet>
        <title>{t('addpub')} | DiVA</title>
      </Helmet>

      <Box
        component='form'
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Stack spacing={1}>
          <div>
            <ErrorSummary errors={errors} />
          </div>
          <Card
            title='Publikationstyp'
            variant='variant6'
            tooltipTitle='Title'
            tooltipBody='Here goes some text about how choose type'
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
              >
                <ControlledEditor
                  required
                  toolbar='italic | alignleft aligncenter alignright | fullscreen | code paste charmap superscript subscript'
                  control={control}
                  name='title'
                  label='Title'
                  plugins='code fullscreen paste charmap'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
              >
                <ControlledMultiCheckboxField
                  options={optionsTest}
                  control={control}
                  name='checkboxValues'
                  label='Checkbox Input'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
              >
                <ControlledRadioButtons
                  options={optionsTest}
                  control={control}
                  name='radioValue'
                  label='Radios label'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <ControlledDateTimePicker
                  control={control}
                  name='startDateTime'
                  label='Start datetime'
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
              >
                <ControlledSelectField
                  control={control}
                  name='publicationType'
                  label='Publication type'
                  placeholder='Select publication type'
                  options={publicationTypeState.publicationTypes.map(
                    (item) => ({ label: item.label, value: item.value }),
                  )}
                  loadingError={publicationTypeState.isError}
                  isLoading={publicationTypeState.isLoading}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
              >
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  <FormLabel>&nbsp;</FormLabel>
                  <Button
                    size='medium'
                    disableRipple
                    variant='outlined'
                  >
                    Change Publication Type
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
          {fields.map((item, index) => {
            return (
              <Card
                variant='variant6'
                key={item.id}
                title={`Author ${index + 1}`}
                tooltipBody='body'
                tooltipTitle='title'
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
                    <ControlledTextField
                      placeholder='First name'
                      control={control}
                      name={`authors.${index}.firstname`}
                      label='First name'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                  >
                    <ControlledTextField
                      placeholder='Last name'
                      control={control}
                      name={`authors.${index}.lastname`}
                      label='Last name'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={3}
                  >
                    <ControlledTextField
                      placeholder='enter birth year'
                      control={control}
                      name={`authors.${index}.birthYear`}
                      label='Birth year'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={3}
                  >
                    <ControlledTextField
                      control={control}
                      name={`authors.${index}.deathYear`}
                      label='Death year'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                  >
                    <ControlledTextField
                      control={control}
                      name={`authors.${index}.localUserId`}
                      label='Local user id'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                  >
                    <ControlledTextField
                      control={control}
                      name={`authors.${index}.orcidId`}
                      label='ORCID-identity'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                  >
                    <ControlledTextField
                      control={control}
                      name={`authors.${index}.email`}
                      label='Email'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                  >
                    <ControlledTextField
                      control={control}
                      name={`authors.${index}.organisation`}
                      label='Organisation'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                  >
                    <ControlledTextField
                      control={control}
                      name={`authors.${index}.researchGroup`}
                      label='Research group'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <ControlledTextField
                      control={control}
                      name={`authors.${index}.otherOrganisation`}
                      label='Other organisation'
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                  >
                    <ButtonGroup
                      variant='outlined'
                      aria-label='outlined secondary button group'
                    >
                      <IconButton
                        aria-label='up'
                        disabled={index === 0}
                        onClick={() => handleMove(index, index - 1)}
                      >
                        <ArrowUpwardIcon />
                      </IconButton>
                      <IconButton
                        aria-label='down'
                        disabled={index === fields.length - 1}
                        onClick={() => handleMove(index, index + 1)}
                      >
                        <ArrowDownwardIcon />
                      </IconButton>
                      <IconButton
                        aria-label='delete'
                        disabled={fields.length === 1}
                        onClick={() => handleRemove(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Card>
            );
          })}
          <Button
            disableRipple
            onClick={() =>
              append({
                firstname: '',
                lastname: '',
                birthYear: '',
                deathYear: '',
                localUserId: '',
                orcidId: '',
                email: '',
                organisation: '',
                researchGroup: '',
                otherOrganisation: '',
              })
            }
            endIcon={<AddCircleOutlineIcon />}
          >
            Add Author
          </Button>
          <Card
            variant='variant6'
            title='Research Subjects'
            tooltipTitle='Research Subjects'
            tooltipBody='some text'
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
              >
                <Controller
                  control={control}
                  name='researchSubjects'
                  render={({ fieldState: { error } }) => (
                    <FormControl fullWidth>
                      <FormLabel
                        required
                        error={error !== undefined}
                      >
                        Research subjects
                      </FormLabel>
                      <ResearchSubjectPicker />
                      <FormHelperText error={error !== undefined}>
                        {error !== undefined ? error.message : ' '}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
              </Grid>
            </Grid>
          </Card>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='flex-start'
          >
            <Grid
              item
              xs={6}
            >
              <Button
                disabled
                disableRipple
                variant='outlined'
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ textAlign: 'right' }}
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
        </Stack>
      </Box>
    </>
  );
};
