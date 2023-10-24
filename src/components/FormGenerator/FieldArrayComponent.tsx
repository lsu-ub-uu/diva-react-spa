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

import { Control, useFieldArray } from 'react-hook-form';
import { Box, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { ActionButtonGroup } from './ActionButtonGroup';
// eslint-disable-next-line import/no-cycle
import { FormComponent } from './types';
import { createDefaultValuesFromComponent } from './utils';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponent;
  renderCallback: (path: string) => unknown;
}

export const FieldArrayComponent = (props: FieldArrayComponentProps) => {
  const { fields, append, move, remove } = useFieldArray({
    control: props.control,
    name: props.name,
  });

  const handleAppend = async () => {
    append(createDefaultValuesFromComponent(props.component, true));
  };

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };

  return (
    <Paper>
      {fields.map((field, index) => (
        <Box key={field.id}>
          {
            props.renderCallback(
              `${props.name}[${index}]` as const,
            ) as JSX.Element
          }
          <ActionButtonGroup
            moveUpButtonDisabled={index === 0}
            moveUpButtonAction={() => handleMove(index, index - 1)}
            moveDownButtonDisabled={index === fields.length - 1}
            moveDownButtonAction={() => handleMove(index, index + 1)}
            deleteButtonDisabled={
              fields.length <= (props.component.repeat?.repeatMin ?? 1)
            }
            deleteButtonAction={() => handleRemove(index)}
          />
        </Box>
      ))}
      <Button
        sx={{ mt: 1, mb: 1 }}
        variant='outlined'
        disabled={fields.length >= (props.component.repeat?.repeatMax ?? 1)}
        onClick={handleAppend}
        disableRipple
        endIcon={<AddCircleOutlineIcon />}
      >
        Add {props.component.name}
      </Button>
    </Paper>
  );
};
