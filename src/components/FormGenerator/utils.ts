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

// eslint-disable-next-line import/no-cycle
import { FormComponent, FormSchema } from './FormGenerator';

const isComponentRepeating = (component: FormComponent) =>
  component.repeat.repeatMin > 1;

export const createDefaultValuesFromFormSchema = (formSchema: FormSchema) => {
  const defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined;
  } = {};
  // todo handle final value in here

  formSchema.components.forEach((component) => {
    if (isComponentRepeating(component)) {
      const numberToShowFromStart =
        component.repeat.minNumberOfRepeatingToShow ?? 0;
      if (component.type === 'textVariable') {
        const initialValues = Array.from(
          { length: numberToShowFromStart },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (_) => ({
            value: '',
          }),
        );

        defaultValues[component.name] = initialValues;
      }
    } else {
      if (component.type === 'textVariable') {
        defaultValues[component.name] = '';
      }
      if (component.type === 'numberVariable') {
        defaultValues[component.name] = '';
      }
    }
  });

  return defaultValues;
};
