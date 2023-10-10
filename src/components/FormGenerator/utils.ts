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

export const hasComponentAttributes = (component: FormComponent) =>
  component.attributes ? component.attributes.length > 0 : false;

export const isComponentRepeating = (component: FormComponent) =>
  component.repeat?.repeatMax > 1 ?? false;

export const isComponentOptional = (component: FormComponent) =>
  component.repeat?.repeatMin === 0 ?? false;

export const createDefaultValuesFromFormSchema = (formSchema: FormSchema) => {
  const defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined | any;
  } = {};
  formSchema.components.forEach((component) => {
    if (isComponentRepeating(component)) {
      const numberToShowFromStart =
        component.repeat.minNumberOfRepeatingToShow ?? 0;
      if (
        component.type === 'collectionVariable' ||
        component.type === 'textVariable' ||
        component.type === 'numberVariable'
      ) {
        defaultValues[component.name] = Array.from(
          { length: numberToShowFromStart },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          (_) => ({
            value: component.finalValue ? component.finalValue : '',
          }),
        );
      }
    } else if (
      component.type === 'textVariable' ||
      component.type === 'numberVariable' ||
      component.type === 'collectionVariable'
    ) {
      if (!component.attributes) {
        defaultValues[component.name] = component.finalValue
          ? component.finalValue
          : '';
      } else {
        // variable with attributes
        const componentDefaultValue = {
          value: component.finalValue ? component.finalValue : '',
        };
        // attributes
        const attributeValues = component.attributes.map((attribute) => ({
          [`_${attribute.name}`]: attribute.finalValue
            ? attribute.finalValue
            : '',
        }));
        defaultValues[component.name] = {
          ...componentDefaultValue,
          ...Object.assign({}, ...attributeValues),
        };
      }
    }
  });

  return defaultValues;
};
