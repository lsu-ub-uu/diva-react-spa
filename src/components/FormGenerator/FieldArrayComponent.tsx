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

interface FieldArrayComponentProps {
  control?: Control<any>;
  name: string;
}

export const FieldArrayComponent = (props: FieldArrayComponentProps) => {
  const { fields } = useFieldArray({
    control: props.control,
    name: props.name,
  });
  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            type='text'
            name={`${props.name}.${index}.value` as const}
            placeholder='someEmptyTextId'
          />
          <button type='button'>Remove</button>
        </div>
      ))}

      <button type='button'>Add</button>
    </>
  );
};
