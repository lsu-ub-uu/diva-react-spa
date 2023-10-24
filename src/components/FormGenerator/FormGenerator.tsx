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

import { Box, Paper } from '@mui/material';
import { Control, FieldValues, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { ControlledTextField, ControlledSelectField } from '../Controlled';
// eslint-disable-next-line import/no-cycle
import {
  createDefaultValuesFromFormSchema,
  generateYupSchema,
  isComponentGroup,
  isComponentRepeating,
  isComponentVariable,
} from './utils';
// eslint-disable-next-line import/no-cycle
import { Typography } from '../index';
import { FormComponent, FormSchema } from './types';
import { FieldArrayComponent } from './FieldArrayComponent';

interface FormGeneratorProps {
  formSchema: FormSchema;
  onSubmit: (formValues: FieldValues) => void;
}

export const renderLeafComponent = (
  component: FormComponent,
  reactKey: string,
  control: Control<any>,
  name: string,
): JSX.Element | null => {
  switch (component.type) {
    case 'textVariable':
    case 'numberVariable': {
      return (
        <ControlledTextField
          key={reactKey}
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
    default:
      return null;
  }
};

export const FormGenerator = (props: FormGeneratorProps) => {
  const methods = useForm({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: createDefaultValuesFromFormSchema(props.formSchema),
    resolver: yupResolver(generateYupSchema(props.formSchema.components)),
  });

  const { control, handleSubmit } = methods;

  // eslint-disable-next-line consistent-return
  const generateFormComponent = (
    component: FormComponent,
    idx: number,
    path: string,
  ) => {
    const reactKey = `key_${idx}`;
    const currentComponentNamePath = !path
      ? `${component.name}`
      : `${path}.${component.name}`;

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

    if (isComponentGroup(component) && !isComponentRepeating(component)) {
      return (
        <Box key={reactKey}>
          {createFormComponentAttributes(component, currentComponentNamePath)}
          {component.components &&
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            createFormComponents(
              component.components,
              currentComponentNamePath,
            )}
        </Box>
      );
    }

    if (isComponentGroup(component) && isComponentRepeating(component)) {
      return (
        <Box key={reactKey}>
          <FieldArrayComponent
            control={control}
            component={component}
            name={currentComponentNamePath}
            renderCallback={(arrayPath: string) => {
              /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
              return [
                ...createFormComponentAttributes(component, arrayPath),
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                ...createFormComponents(component.components ?? [], arrayPath),
              ];
            }}
          />
        </Box>
      );
    }
    if (isComponentVariable(component) && isComponentRepeating(component)) {
      return (
        <Paper key={reactKey}>
          <FieldArrayComponent
            control={control}
            component={component}
            name={currentComponentNamePath}
            renderCallback={(variableArrayPath: string) => {
              return [
                ...createFormComponentAttributes(component, variableArrayPath),
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                renderLeafComponent(
                  component,
                  variableArrayPath,
                  control,
                  `${variableArrayPath}.value`,
                ),
              ];
            }}
          />
        </Paper>
      );
    }
    return (
      <div key={reactKey}>
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
    path = '',
  ): JSX.Element[] => {
    return components.map((c, i) => generateFormComponent(c, i, path));
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((values) => props.onSubmit(values))}
    >
      {createFormComponents(props.formSchema.components)}

      <Button
        sx={{ mt: 4, mb: 2 }}
        fullWidth
        type='submit'
        disableRipple
        variant='contained'
      >
        Submit
      </Button>
    </Box>
  );
};
