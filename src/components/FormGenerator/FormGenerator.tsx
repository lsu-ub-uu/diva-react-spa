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

import { Box } from '@mui/material';
import { Control, FieldValues, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { ControlledTextField, ControlledSelectField } from '../Controlled';
// eslint-disable-next-line import/no-cycle
import {
  createDefaultValuesFromFormSchema,
  generateYupSchema,
  isComponentRepeating,
  isComponentValidForDataCarrying,
} from './utils';
// eslint-disable-next-line import/no-cycle
import { FieldArrayComponent } from './FieldArrayComponent';
import { Typography } from '../index';
import { FormComponent, FormSchema } from './types';

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
    case 'group': {
      return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <React.Fragment key={`${reactKey}_group`}>
          {component.components?.map((childComponent) => {
            return renderLeafComponent(
              childComponent,
              `${reactKey}_group_${childComponent.name}`,
              control,
              `${component.name}.${childComponent.name}`,
            );
          })}
        </React.Fragment>
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
  const generateFormComponent = (component: FormComponent, idx: number) => {
    const reactKey = `${component.name}_${idx}`;

    if (
      isComponentRepeating(component) &&
      isComponentValidForDataCarrying(component)
    ) {
      return (
        <FieldArrayComponent
          component={component}
          key={reactKey}
          control={control}
          name={component.name}
        />
      );
    }

    let renderResult = renderLeafComponent(
      component,
      reactKey,
      control,
      `${component.name}.value`,
    );

    if (component.attributes !== undefined) {
      renderResult = (
        // @ts-ignore
        <React.Fragment key={reactKey}>
          {renderResult}
          {component.attributes.map((attribute, index) => {
            return (
              <ControlledSelectField
                key={`${attribute.name}_${index}`}
                name={`${component.name}._${attribute.name}`}
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
          })}
        </React.Fragment>
      );
    }

    return renderResult;
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit((values) => props.onSubmit(values))}
    >
      {props.formSchema.components.map(generateFormComponent)}
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
