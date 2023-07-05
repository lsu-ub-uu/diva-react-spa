import React, { useEffect } from 'react';
import {
  Box,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  publicationTypeSelector,
  loadPublicationTypesAsync,
} from '../features/publicationTypes';
import { getOneForm } from '../features/form/formSlice';

import {
  AsidePortal,
  Card,
  Select,
  useBackdrop,
  ErrorSummary,
  ResearchSubjectPicker,
  DatePicker,
  Checkbox,
  Radio,
} from '../components';
import { Tooltip } from '../components/Tooltip/Tooltip';
import { ControlledTextField } from '../components/Controlled';

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

export interface InfoButtonProps {
  title: string;
  body: string;
}

const InfoButton = (props: InfoButtonProps) => {
  return (
    <Tooltip
      title={props.title}
      body={props.body}
    >
      <IconButton
        disableRipple
        color='info'
        aria-label='info'
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export const ReactHookFormGenPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const publicationTypeState = useAppSelector(publicationTypeSelector);
  const { form, isLoading, isError, message } = useAppSelector(
    (state) => state.form,
  );
  const { setBackdrop } = useBackdrop();
  useEffect(() => {
    setBackdrop(true);
    dispatch(loadPublicationTypesAsync(() => setBackdrop(false)));
    dispatch(getOneForm('article'));
  }, [dispatch, setBackdrop]);

  const validationCreator = () => {
    console.log('form', form);
    const validation: any = {};
    Object.values(form.cards).forEach((child: any) => {
      const validationChild: any = {};
      Object.values(child.children).forEach((childNode: any) => {
        switch (childNode.type) {
          case 'select':
            // eslint-disable-next-line no-case-declarations
            const options: any = [];
            childNode.children.map((value: any) => {
              return options.push(value.value);
            });
            validationChild[childNode.name] = yup
              .string()
              .oneOf(options)
              .required(`${child.name} is required`);
            break;
          case 'input':
            if (childNode.name === 'email') {
              // console.log('email');
              validationChild[childNode.name] = yup
                .string()
                .email()
                .matches(childNode.regex);
            }
            validationChild[childNode.name] = yup
              .string()
              // .required()
              .matches(childNode.regex)
              .min(childNode?.min)
              .max(childNode?.max);
            break;
          case 'textarea':
            if (childNode.name === 'email') {
              validationChild[childNode.name] = yup
                .string()
                .email()
                .matches(childNode.regex);
            }
            validationChild[childNode.name] = yup
              .string()
              .required()
              .matches(childNode.regex)
              .min(childNode?.min)
              .max(childNode?.max);

            break;
          case 'button':
            break;
          case 'radio':
          case 'checkbox':
            validationChild[childNode.name] = yup.string();
            break;

          case 'date':
            validationChild[childNode.name] = yup
              .string()
              .matches(childNode.regex);
            break;

          case 'time':
            validationChild[childNode.name] = yup
              .string()
              .matches(childNode.regex);
            break;

          default:
            return null;
        }
      });
      validation[child.name] = yup
        .array()
        .min(child?.min)
        .max(child?.max)
        .of(yup.object().shape(validationChild));
    });
    return validation;
  };

  const generatedValidationSchema = yup.object().shape(validationCreator());
  // const validationSchema = yup.object().shape({
  //   publicationType: yup.string().required('Publication type is required'),
  //   // eslint-disable-next-line react/forbid-prop-types
  //   authors: yup
  //     .array()
  //     .of(
  //       yup.object().shape({
  //         firstname: yup
  //           .string()
  //           .trim()
  //           .matches(/[A-Za-z]{3}/),
  //         lastname: yup.string().trim().required(),
  //         birthYear: yup.string().matches(/^(?:\d{4})?$/),
  //         deathYear: yup.string().matches(/^(?:\d{4})?$/),
  //         localUserId: yup.string().trim(),
  //         organisation: yup.string().trim().required(),
  //         orcidId: yup.string().trim(),
  //         researchGroup: yup.string().trim().required(),
  //         email: yup.string().email(),
  //         otherOrganisation: yup.string().trim(),
  //       }),
  //     )
  //     .min(1)
  //     .max(3),
  //   researchSubjects: yup.array().of(yup.string()).min(1).max(4),
  // });

  console.log('gen', generatedValidationSchema);
  // console.log('sch', validationSchema);

  const generatedDefaultValues = {};
  const defaultValuesCreator = () => {
    const defaultValues: any = {};
    Object.values(form.cards).forEach((child: any) => {
      // console.log(child);
      defaultValues[child.name] = [];
      if (child.max > 1) {
        defaultValues[child.name] = [];
        const childObject = {};
        Object.values(child.children).forEach((childNode: any) => {
          childObject[childNode.name] = '';
        });
        defaultValues[child.name].push(childObject);
        // console.log('cO', childObject);
      } else {
        defaultValues[child.name] = {};
        const childObject = {};
        Object.values(child.children).forEach((childNode: any) => {
          childObject[childNode.name] = '';
        });
        defaultValues[child.name] = childObject;
        console.log('cO', childObject);
      }
      Object.values(child.children).forEach((childNode: any) => {});
    });
    return defaultValues;
  };
  console.log('dVC', defaultValuesCreator());

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
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
  console.log('met', methods);
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

  const translationsEN: any = {};
  const translationsSV: any = {};

  return (
    <>
      <Helmet>
        <title>{t('addpub')} | DiVA</title>
      </Helmet>
      <AsidePortal>
        <p>AAAAAAAAA</p>
      </AsidePortal>

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
                sm={8}
              >
                <Controller
                  control={control}
                  name='publicationType'
                  render={({
                    field: { onChange, ref, value },
                    fieldState: { error },
                  }) => (
                    <FormControl fullWidth>
                      <FormLabel
                        required
                        error={error !== undefined}
                      >
                        Publication type
                      </FormLabel>
                      <Select
                        size='small'
                        value={
                          publicationTypeState.publicationTypes.length
                            ? value
                            : ''
                        }
                        onChange={onChange}
                        ref={ref}
                        fullWidth
                        loadingError={publicationTypeState.isError}
                        error={error !== undefined}
                        loading={isLoading}
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
                      placeHolder='First name'
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
                      placeHolder='Last name'
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
                      placeHolder='enter birth year'
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
          {isLoading || message === '' ? (
            Object.values(form.cards).map((formPart: any, i) => {
              // console.log(formPart);
              translationsEN[formPart.name] = formPart.label.en;
              translationsSV[formPart.name] = formPart.label.sv;
              // console.log(translationsEN, translationsSV);

              i18n.addResources('en', 'form', translationsEN);
              i18n.addResources('sv', 'form', translationsSV);
              // console.log('i', translationsEN, translationsSV);
              return (
                <Card
                  key={i}
                  title={t(formPart.name, { ns: 'form' }) as string}
                  // title={t(`${formPart.name.sv}`, 'aaa')}
                  variant='variant6'
                  tooltipTitle='Title'
                  tooltipBody={formPart?.deftext?.sv}
                >
                  {formPart.children.map((child: any) => {
                    switch (child.type) {
                      case 'select':
                        return (
                          <React.Fragment key={child.name}>
                            <FormControl fullWidth>
                              <FormLabel
                                required
                                error={isError !== undefined}
                              >
                                {child.label?.sv}
                              </FormLabel>
                              <Select
                                size='small'
                                value={
                                  child.children.length.length ? value : ''
                                }
                                // onChange={onChange}
                                // ref={ref}
                                fullWidth
                                loadingError={publicationTypeState.isError}
                                error={isError !== undefined}
                                loading={publicationTypeState.isLoading}
                              >
                                {child &&
                                  child.children.map(
                                    (
                                      options: any,
                                      // j: React.Key | null | undefined,
                                    ) => {
                                      if (options.value !== '') {
                                        translationsEN[options.value] =
                                          options.name?.en;
                                        translationsSV[options.value] =
                                          options.name?.sv;
                                      }

                                      return (
                                        <MenuItem
                                          key={`${options.value}`}
                                          disableRipple
                                          value={options.value}
                                        >
                                          {/* {options.name.sv} */}
                                          {t(options.value as string, {
                                            ns: 'form',
                                          })}
                                        </MenuItem>
                                      );
                                    },
                                  )}
                              </Select>
                              <FormHelperText error={isError !== undefined}>
                                {isError !== undefined ? isError : ' '}
                              </FormHelperText>
                            </FormControl>
                          </React.Fragment>
                        );
                      case 'input':
                        translationsEN[child.name] = child.label?.en;
                        translationsSV[child.name] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            <ControlledTextField
                              size='small'
                              control={control}
                              placeHolder={
                                t(child.name as string, {
                                  ns: 'form',
                                }) as string
                              }
                              name={child.name}
                              label={t(child.name as string, { ns: 'form' })}
                            />
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );
                      case 'textarea':
                        translationsEN[child.name] = child.label?.en;
                        translationsSV[child.name] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            <ControlledTextField
                              control={control}
                              placeHolder={
                                t(child.name as string, {
                                  ns: 'form',
                                }) as string
                              }
                              name={child.name}
                              label={t(child.name as string, { ns: 'form' })}
                            />
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );
                      case 'button':
                        translationsEN[child.name] = child.label?.en;
                        translationsSV[child.name] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            <Button
                              type='button'
                              disableRipple
                              variant='outlined'
                              endIcon={<ArrowForwardIcon />}
                            >
                              {t(child.name as string, { ns: 'form' })}
                            </Button>

                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );
                      case 'radio':
                        translationsEN[child.name] = child.label?.en;
                        translationsSV[child.name] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            <RadioGroup
                              row
                              aria-labelledby='demo-radio-buttons-group-label'
                              // defaultValue={'female'}
                              name={`radio-button-${child.name}-group`}
                            >
                              {child.deftext?.sv ? (
                                <i>{child.deftext?.sv}</i>
                              ) : null}
                              {child.children.map((options: any) => {
                                translationsEN[options.value] =
                                  options.name?.en;
                                translationsSV[options.value] =
                                  options.name?.sv;
                                return (
                                  <React.Fragment key={options.value}>
                                    <FormControlLabel
                                      value={options.value}
                                      control={<Radio />}
                                      // label={child.label?.sv}
                                      label={t(options.value as string, {
                                        ns: 'form',
                                      })}
                                    />
                                    {child.deftext?.sv ? (
                                      <InfoButton
                                        title=''
                                        body={child?.deftext?.sv}
                                      />
                                    ) : null}
                                  </React.Fragment>
                                );
                              })}
                            </RadioGroup>
                          </React.Fragment>
                        );
                      case 'checkbox':
                        translationsEN[child.name] = child.label?.en;
                        translationsSV[child.name] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            {child.children.map((options: any) => {
                              translationsEN[options.value] = options.name?.en;
                              translationsSV[options.value] = options.name?.sv;
                              return (
                                <React.Fragment key={options.value}>
                                  <FormControlLabel
                                    value={options.value}
                                    control={<Checkbox />}
                                    label={t(options.value as string, {
                                      ns: 'form',
                                    })}
                                  />
                                  {child.deftext?.sv ? (
                                    <InfoButton
                                      title=''
                                      body={child?.deftext?.sv}
                                    />
                                  ) : null}
                                </React.Fragment>
                              );
                            })}
                          </React.Fragment>
                        );
                      case 'date':
                        translationsEN[child.name] = child.label?.en;
                        translationsSV[child.name] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            <label htmlFor={child.name}>
                              {t(child.name as string, { ns: 'form' })}
                            </label>
                            <DatePicker
                              onChange={(e) => console.log(e)}
                              value={dayjs()}
                            />
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );

                      case 'time':
                        translationsEN[child.name] = child.label?.en;
                        translationsSV[child.name] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            <label htmlFor={child.name}>
                              {t(child.name as string, { ns: 'form' })}
                            </label>
                            <input
                              pattern={child.regex}
                              id={child.name}
                              type={child.type}
                            />
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );

                      default:
                        return null;
                    }
                  })}
                </Card>
              );
            })
          ) : (
            <p>{message}</p>
          )}
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
