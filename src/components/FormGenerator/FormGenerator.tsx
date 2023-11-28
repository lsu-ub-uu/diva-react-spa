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

import { Box, Divider, Grid } from '@mui/material';
import { Control, FieldValues, useForm } from 'react-hook-form';
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
  onInvalid?: () => void;
}

export const renderLeafComponent = (
  component: FormComponent,
  reactKey: string,
  control: Control<any>,
  name: string,
): JSX.Element | null => {
  switch (component.type) {
    case 'textVariable':
    case 'numberVariable':
    case 'recordLink': {
      return (
        <ControlledTextField
          key={reactKey}
          multiline={component.inputType === 'textarea'}
          label={component.label ?? ''}
          name={name}
          placeholder={component.placeholder}
          tooltip={component.tooltip}
          control={control}
          readOnly={!!component.finalValue}
        />
      );
    }
    case 'collectionVariable': {
      return (
        <ControlledSelectField
          key={reactKey}
          name={name}
          isLoading={false}
          loadingError={false}
          label={component.label ?? ''}
          placeholder={component.placeholder}
          tooltip={component.tooltip}
          control={control}
          options={component.options}
          readOnly={!!component.finalValue}
        />
      );
    }
    case 'text': {
      return (
        <Typography
          key={reactKey}
          variant={component.textStyle ?? 'bodyTextStyle'}
          text={component.name}
        />
      );
    }
    case 'guiElementLink': {
      // TODO If needed take component.presentAs in consideration
      return (
        <LinkButton
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
    parentComponent: FormComponent | undefined,
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
            padding: '10px',
          }}
        >
          {component.components &&
            createFormComponents(
              component.components,
              component,
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
        <Card
          sx={{ mb: 2 }}
          key={reactKey}
          title={t(component.label as string) as string}
          variant='variant6'
          tooltipTitle={t(component.tooltip?.title as string) as string}
          tooltipBody={t(component.tooltip?.body as string) as string}
        >
          {createFormComponentAttributes(component, currentComponentNamePath)}
          {component.components &&
            createFormComponents(
              component.components,
              component,
              currentComponentNamePath,
            )}
          <span id={component.name} />
        </Card>
      ) : (
        <Box key={reactKey}>
          <Typography
            text={component?.label ?? ''}
            variant={headlineLevelToTypographyVariant(component.headlineLevel)}
          />
          {createFormComponentAttributes(component, currentComponentNamePath)}
          {component.components &&
            createFormComponents(
              component.components,
              component,
              currentComponentNamePath,
            )}
          <span id={component.name} />
        </Box>
      );
    }

    if (isComponentGroup(component) && isComponentRepeating(component)) {
      return isFirstLevel(currentComponentNamePath) ? (
        <FieldArrayComponent
          key={reactKey}
          control={control}
          component={component}
          parentComponent={parentComponent}
          name={currentComponentNamePath}
          renderCallback={(arrayPath: string) => {
            return [
              ...createFormComponentAttributes(component, arrayPath),
              ...createFormComponents(
                component.components ?? [],
                component,
                arrayPath,
              ),
            ];
          }}
        />
      ) : (
        <Box key={reactKey}>
          <Typography
            text={component?.label ?? ''}
            variant={headlineLevelToTypographyVariant(component.headlineLevel)}
          />
          <span id={component.name} />
          <FieldArrayComponent
            control={control}
            component={component}
            parentComponent={parentComponent}
            name={currentComponentNamePath}
            renderCallback={(arrayPath: string) => {
              return [
                ...createFormComponentAttributes(component, arrayPath),
                ...createFormComponents(
                  component.components ?? [],
                  component,
                  arrayPath,
                ),
              ];
            }}
          />
        </Box>
      );
    }
    if (isComponentVariable(component) && isComponentRepeating(component)) {
      return (
        <FieldArrayComponent
          key={reactKey}
          control={control}
          component={component}
          parentComponent={parentComponent}
          name={currentComponentNamePath}
          renderCallback={(variableArrayPath: string) => {
            return [
              ...createFormComponentAttributes(component, variableArrayPath),
              renderLeafComponent(
                component,
                variableArrayPath,
                control,
                `${variableArrayPath}.value`,
              ),
            ];
          }}
        />
      );
    }
    return (
      <div
        key={reactKey}
        style={{ background: 'transparent', width: '100%' }}
      >
        {createFormComponentAttributes(component, currentComponentNamePath)}
        {renderLeafComponent(
          component,
          reactKey,
          control,
          `${currentComponentNamePath}.value`,
        )}
      </div>
    );
  };

  const createFormComponents = (
    components: FormComponent[],
    parentComponent: FormComponent | undefined,
    path = '',
  ): JSX.Element[] => {
    return components.map((c, i) =>
      generateFormComponent(c, parentComponent, i, path),
    );
  };

  return (
    <Box
      component='form'
      sx={{ width: '100%' }}
      onSubmit={handleSubmit(
        (values) => props.onSubmit(values),
        () => props.onInvalid && props.onInvalid(),
      )}
    >
      <Grid
        container
        direction='row'
        justifyContent='flex-start'
        alignItems='flex-start'
      >
        {generateFormComponent(props.formSchema.form, undefined, 0, '')}
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Box
        component='span'
        sx={{ mt: 2, mb: 2 }}
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
    </Box>
  );
};
