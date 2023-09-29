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
import { ControlledTextField } from '../Controlled';
// eslint-disable-next-line import/no-cycle
import { FormComponent } from './FormGenerator';

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
  component: FormComponent;
}

export const FieldArrayComponent = (props: FieldArrayComponentProps) => {
  const { fields, remove, append } = useFieldArray({
    control: props.control,
    name: props.name,
  });

  const handleRemove = async (index: number) => {
    remove(index);
  };

  return (
    <>
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{
            borderBottom: '1px dashed black',
            marginBottom: '10px',
            padding: '10px',
          }}
        >
          <ControlledTextField
            placeholder={props.component.placeholder}
            control={props.control}
            name={`${props.name}.${index}.value` as const}
            label={props.component.name}
            tooltip={props.component.tooltip}
          />
          <button
            type='button'
            disabled={fields.length <= props.component.repeat.repeatMin}
            onClick={() => handleRemove(index)}
          >
            Remove
          </button>
        </div>
      ))}

      <button
        style={{ marginBottom: '20px' }}
        type='button'
        disabled={fields.length >= props.component.repeat.repeatMax}
        onClick={() => append({ value: '' })}
      >
        Add {props.component.name}
      </button>
    </>
  );
};
