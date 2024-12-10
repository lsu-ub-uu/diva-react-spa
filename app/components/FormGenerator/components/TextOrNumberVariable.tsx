/*
 * Copyright 2024 Uppsala University Library
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
 */

import {
  FormComponentNumVar,
  FormComponentVar,
} from '@/components/FormGenerator/types';
import {
  checkIfComponentHasValue,
  convertChildStyleToString,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Grid2 as Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ControlledTextField } from '@/components/Controlled';
import { useRemixFormContext } from 'remix-hook-form';
import { Attributes } from '@/components/FormGenerator/components/Attributes';
import path from 'node:path';

interface TextOrNumberVariableProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponentVar | FormComponentNumVar;
  name: string;
  parentPresentationStyle: string | undefined;
}

export const TextOrNumberVariable = ({
  reactKey,
  renderElementGridWrapper,
  component,
  name,
  parentPresentationStyle,
}: TextOrNumberVariableProps) => {
  const { getValues, control } = useRemixFormContext();

  const hasValue = checkIfComponentHasValue(getValues, name);
  return (
    <Grid
      key={reactKey}
      size={{
        xs: 12,
        sm: renderElementGridWrapper ? component.gridColSpan : 12,
      }}
      style={{
        flexBasis:
          convertChildStyleToString(component.childStyle) === 'compact'
            ? 'auto'
            : '100%',
      }}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <ControlledTextField
        multiline={
          'inputType' in component
            ? component.inputType === 'textarea'
            : undefined
        }
        label={component.label ?? ''}
        showLabel={component.showLabel}
        name={name}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        attributes={
          <Attributes
            component={component}
            path={name}
          />
        }
        parentPresentationStyle={parentPresentationStyle}
        hasValue={hasValue}
        inputFormat={
          'inputFormat' in component ? component.inputFormat : undefined
        }
      />
    </Grid>
  );
};
