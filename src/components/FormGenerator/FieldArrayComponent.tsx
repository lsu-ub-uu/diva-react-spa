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
import { Stack } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { ActionButtonGroup } from './ActionButtonGroup';
// eslint-disable-next-line import/no-cycle
import { FormComponent, renderVariableField } from './FormGenerator';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponent;
}

export const FieldArrayComponent = (props: FieldArrayComponentProps) => {
  const { fields, append, move, remove } = useFieldArray({
    control: props.control,
    name: props.name,
  });

  const handleAppend = async () => {
    append({
      value: props.component.finalValue ? props.component.finalValue : '',
    });
  };

  const handleMove = async (prev: number, next: number) => {
    move(prev, next);
  };

  const handleRemove = async (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.map((field, index) => (
        <Stack
          key={field.id}
          spacing={{ xs: 1 }}
          direction='row'
        >
          {renderVariableField(
            props.component,
            field.id,
            props.control as Control,
            `${props.name}.${index}.value` as const,
          )}
          <ActionButtonGroup
            moveUpButtonDisabled={index === 0}
            moveUpButtonAction={() => handleMove(index, index - 1)}
            moveDownButtonDisabled={index === fields.length - 1}
            moveDownButtonAction={() => handleMove(index, index + 1)}
            deleteButtonDisabled={
              fields.length <= props.component.repeat.repeatMin
            }
            deleteButtonAction={() => handleRemove(index)}
          />
        </Stack>
      ))}
      <Button
        sx={{ mt: 1, mb: 1 }}
        variant='outlined'
        disabled={fields.length >= props.component.repeat.repeatMax}
        onClick={handleAppend}
        disableRipple
        endIcon={<AddCircleOutlineIcon />}
      >
        Add {props.component.name}
      </Button>
    </>
  );
};
