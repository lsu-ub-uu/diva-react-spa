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
  FormComponent,
  FormComponentText,
} from '@/components/FormGenerator/types';
import { Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { Typography } from '@/components';

import { convertChildStyleToString } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';

interface TextProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponentText;
}

export const Text = ({
  reactKey,
  renderElementGridWrapper,
  component,
}: TextProps) => {
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
            : '2em',
      }}
      id={`anchor_${addAttributesToName(component, component.name)}`}
    >
      <Typography
        variant={component.textStyle ?? 'bodyTextStyle'}
        text={component.name}
      />
    </Grid>
  );
};
