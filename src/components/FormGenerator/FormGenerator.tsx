/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react';
import { Box, Container, Grid, Toolbar } from '@mui/material';
import { Control, FieldErrors, FieldValues, useForm } from 'react-hook-form';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControlledTextField, ControlledSelectField } from '../Controlled';
import {
  createDefaultValuesFromFormSchema,
  generateYupSchemaFromFormSchema,
  isComponentContainer,
  isComponentGroup,
  isComponentRepeating,
  isComponentRepeatingContainer,
  isComponentSurroundingContainer,
  isComponentVariable,
  isFirstLevel,
  RecordData,
} from './utils';
import { Typography, LinkButton, Card } from '../index';
import { FormComponent, FormSchema } from './types';
import { FieldArrayComponent } from './FieldArrayComponent';
import { DivaTypographyVariants } from '../Typography/Typography';
import { CoraRecord } from '../../app/hooks';

interface FormGeneratorProps {
  record?: CoraRecord;
  formSchema: FormSchema;
  onSubmit: (formValues: FieldValues) => void;
  onInvalid?: (fieldErrors: FieldErrors) => void;
}

export const renderLeafComponent = (
  component: FormComponent,
  reactKey: string,
  control: Control<any>,
  name: string,
  renderElementGridWrapper: boolean,
): JSX.Element | null => {
  switch (component.type) {
    case 'textVariable':
    case 'numberVariable':
    case 'recordLink': {
      return (
        <Grid
          key={reactKey}
          item
          xs={12}
          sm={renderElementGridWrapper ? component.gridColSpan : 12}
        >
          <ControlledTextField
            multiline={component.inputType === 'textarea'}
            label={component.label ?? ''}
            name={name}
            placeholder={component.placeholder}
            tooltip={component.tooltip}
            control={control}
            readOnly={!!component.finalValue}
            displayMode={component.mode}
          />
        </Grid>
      );
    }
    case 'collectionVariable': {
      return (
        <Grid
          key={reactKey}
          item
          xs={12}
          sm={renderElementGridWrapper ? component.gridColSpan : 12}
        >
          <ControlledSelectField
            name={name}
            isLoading={false}
            loadingError={false}
            label={component.label ?? ''}
            placeholder={component.placeholder}
            tooltip={component.tooltip}
            control={control}
            options={component.options}
            readOnly={!!component.finalValue}
            displayMode={component.mode}
          />
        </Grid>
      );
    }
    case 'text': {
      return (
        <Grid
          key={reactKey}
          item
          xs={12}
          sm={renderElementGridWrapper ? component.gridColSpan : 12}
        >
          <Typography
            variant={component.textStyle ?? 'bodyTextStyle'}
            text={component.name}
          />
        </Grid>
      );
    }
    case 'guiElementLink': {
      // TODO If needed take component.presentAs in consideration
      return (
        <LinkButton
          key={reactKey}
          href={component.url ?? ''}
          text={component.elementText ?? ''}
        />
      );
    }
    default:
      return null;
  }
};

// move to utils
const headlineLevelToTypographyVariant = (
  headlineLevel: string | undefined,
): DivaTypographyVariants['variant'] => {
  let typographyVariant: DivaTypographyVariants['variant'];
  if (headlineLevel !== undefined) {
    typographyVariant =
      `${headlineLevel}TextStyle` as DivaTypographyVariants['variant'];
  } else {
    typographyVariant = 'h2TextStyle';
  }

  return typographyVariant as DivaTypographyVariants['variant']; // check style to return as default
};

export const FormGenerator = (props: FormGeneratorProps) => {
  const { t } = useTranslation();
  const methods = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: createDefaultValuesFromFormSchema(
      props.formSchema,
      props.record?.data as RecordData,
    ),
    resolver: yupResolver(generateYupSchemaFromFormSchema(props.formSchema)),
  });

  const { control, handleSubmit, reset } = methods;

  // eslint-disable-next-line consistent-return
  const generateFormComponent = (
    component: FormComponent,
    // parentComponent: FormComponent | undefined,
    idx: number,
    path: string,
  ) => {
    const reactKey = `key_${idx}`;

    let currentComponentNamePath;
    if (isComponentContainer(component)) {
      currentComponentNamePath = path;
    } else {
      currentComponentNamePath = !path
        ? `${component.name}`
        : `${path}.${component.name}`;
    }

    const createFormComponentAttributes = (
      aComponent: FormComponent,
      aPath: string,
    ) => {
      return (aComponent.attributes ?? []).map((attribute, index) => {
        return (
          <Grid
            key={attribute.name}
            item
            xs={12}
          >
            <ControlledSelectField
              key={`${attribute.name}_${index}`}
              name={`${aPath}._${attribute.name}`}
              isLoading={false}
              loadingError={false}
              label={attribute.label ?? ''}
              placeholder={attribute.placeholder}
              tooltip={attribute.tooltip}
              control={control}
              options={attribute.options}
              readOnly={!!attribute.finalValue}
            />
          </Grid>
        );
      });
    };

    if (
      isComponentSurroundingContainer(component) &&
      !isComponentRepeating(component)
    ) {
      return (
        <div
          id='dummy-surrounding-container'
          key={reactKey}
          style={{
            background: 'lightgray',
            border: '2px solid black',
            padding: '16px',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          {component.components &&
            createFormComponents(
              component.components,
              currentComponentNamePath,
            )}
        </div>
      );
    }

    if (
      (isComponentGroup(component) ||
        isComponentRepeatingContainer(component)) &&
      !isComponentRepeating(component)
    ) {
      return isFirstLevel(currentComponentNamePath) ? (
        <span
          key={reactKey}
          className='anchorLink'
          id={`anchor_${component.name}`}
        >
          <Card
            sx={{ mb: 2 }}
            title={t(component.label as string) as string}
            variant='variant6'
            tooltipTitle={t(component.tooltip?.title as string) as string}
            tooltipBody={t(component.tooltip?.body as string) as string}
          >
            <Grid
              container
              spacing={2}
              justifyContent='space-between'
              alignItems='flex-start'
            >
              {createFormComponentAttributes(
                component,
                currentComponentNamePath,
              )}
              {component.components &&
                createFormComponents(
                  component.components,
                  currentComponentNamePath,
                )}
            </Grid>
          </Card>
        </span>
      ) : (
        <Box
          key={reactKey}
          id='outer-start-form'
        >
          <Typography
            text={component?.label ?? ''}
            variant={headlineLevelToTypographyVariant(component.headlineLevel)}
          />
          {createFormComponentAttributes(component, currentComponentNamePath)}
          {component.components &&
            createFormComponents(
              component.components,
              currentComponentNamePath,
            )}
        </Box>
      );
    }

    if (isComponentGroup(component) && isComponentRepeating(component)) {
      return isFirstLevel(currentComponentNamePath) ? (
        <FieldArrayComponent
          key={reactKey}
          control={control}
          component={component}
          name={currentComponentNamePath}
          renderCallback={(arrayPath: string) => {
            return [
              ...createFormComponentAttributes(component, arrayPath),
              ...createFormComponents(component.components ?? [], arrayPath),
            ];
          }}
        />
      ) : (
        <Grid
          item
          xs={12}
          key={reactKey}
          sx={{ position: 'relative' }}
        >
          <Typography
            text={component?.label ?? ''}
            variant={headlineLevelToTypographyVariant(component.headlineLevel)}
          />
          <FieldArrayComponent
            control={control}
            component={component}
            name={currentComponentNamePath}
            renderCallback={(arrayPath: string) => {
              return [
                ...createFormComponentAttributes(component, arrayPath),
                ...createFormComponents(component.components ?? [], arrayPath),
              ];
            }}
          />
        </Grid>
      );
    }
    if (isComponentVariable(component) && isComponentRepeating(component)) {
      return (
        <FieldArrayComponent
          key={reactKey}
          control={control}
          component={component}
          name={currentComponentNamePath}
          renderCallback={(variableArrayPath: string) => {
            return [
              ...createFormComponentAttributes(component, variableArrayPath),
              renderLeafComponent(
                component,
                variableArrayPath,
                control,
                `${variableArrayPath}.value`,
                false,
              ),
            ];
          }}
        />
      );
    }
    return (
      <React.Fragment key={reactKey}>
        {createFormComponentAttributes(component, currentComponentNamePath)}
        {renderLeafComponent(
          component,
          reactKey,
          control,
          `${currentComponentNamePath}.value`,
          true,
        )}
      </React.Fragment>
    );
  };

  const createFormComponents = (
    components: FormComponent[],
    // parentComponent: FormComponent | undefined,
    path = '',
  ): JSX.Element[] => {
    return components.map((c, i) => generateFormComponent(c, i, path));
  };

  return (
    <Box
      component='form'
      sx={{ width: '100%' }}
      onSubmit={handleSubmit(
        (values) => props.onSubmit(values),
        (errors) => props.onInvalid && props.onInvalid(errors),
      )}
    >
      {generateFormComponent(props.formSchema.form, 0, '')}

      <AppBar
        position='fixed'
        style={{
          backgroundColor: '#eee',
          top: 'auto',
          bottom: 0,
          display: 'block',
        }}
      >
        <Container maxWidth='lg'>
          <Grid container>
            <Grid
              item
              xs={3}
            />
            <Grid
              item
              xs={9}
            >
              <Toolbar>
                <Box
                  component='div'
                  sx={{ mt: 1, mb: 1, width: '100%' }}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                >
                  <Button
                    disableRipple
                    variant='contained'
                    color='secondary'
                    sx={{ height: 40 }}
                    onClick={() => reset()}
                  >
                    {t('divaClient_ResetButtonText')}
                  </Button>
                  <Button
                    type='submit'
                    disableRipple
                    variant='contained'
                    color='primary'
                    sx={{ height: 40 }}
                  >
                    {t('divaClient_SubmitButtonText')}
                  </Button>
                </Box>
              </Toolbar>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </Box>
  );
};
