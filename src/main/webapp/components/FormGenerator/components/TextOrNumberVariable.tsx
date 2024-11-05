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

import { FormComponent } from '@/components/FormGenerator/types';
import { useFormContext } from 'react-hook-form';
import {
  checkIfComponentHasValue,
  convertChildStyleToString,
} from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import { Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ControlledTextField } from '@/components/Controlled';

interface TextOrNumberVariableProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponent;
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
  const { getValues, control } = useFormContext();

  const hasValue = checkIfComponentHasValue(getValues, name);
  return (
    <Grid
      key={reactKey}
      item
      xs={12}
      sm={renderElementGridWrapper ? component.gridColSpan : 12}
      style={{
        flexBasis:
          convertChildStyleToString(component.childStyle) === 'compact'
            ? 'auto'
            : '100%',
      }}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <ControlledTextField
        multiline={component.inputType === 'textarea'}
        label={component.label ?? ''}
        showLabel={component.showLabel}
        name={name}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        parentPresentationStyle={parentPresentationStyle}
        hasValue={hasValue}
        inputFormat={component.inputFormat}
      />
    </Grid>
  );
};
