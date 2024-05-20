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

import { FormAttributeCollection, FormComponent, FormSchema } from './types';
import {
  isComponentContainer,
  isComponentRepeating,
  isComponentValidForDataCarrying,
  isComponentVariable,
} from './utils/helper';

export interface RecordData {
  [key: string]: any;
}

export const removeRootObject = (obj: object) => {
  const childKeys = Object.keys(obj);
  if (childKeys.length === 1) {
    // @ts-ignore
    return obj[childKeys[0]];
  }
};

export const createDefaultValue = (
  component: FormComponent | FormAttributeCollection,
) => (component.finalValue ? component.finalValue : '');

export const generateComponentAttributes = (component: FormComponent) => {
  const attributeValues =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]:
          createDefaultValue(attributeCollection),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValues),
  };
};

export const generateRepeatingObject = (
  size: number,
  obj: unknown,
): unknown[] => {
  return Array.from({ length: size }, () => obj);
};

export const getMinNumberOfRepeatingToShow = (component: FormComponent) =>
  component.repeat?.minNumberOfRepeatingToShow ??
  component.repeat?.repeatMin ??
  0;

export const createDefaultValuesFromComponent = (
  component: FormComponent,
  forceDefaultValuesForAppend = false,
) => {
  let defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined | unknown[];
  } = {};

  const formDefaultObject = isComponentVariable(component)
    ? {
        value: createDefaultValue(component),
        ...generateComponentAttributes(component),
      }
    : {
        // groups
        ...createDefaultValuesFromComponents(component.components),
        ...generateComponentAttributes(component),
      };

  if (forceDefaultValuesForAppend) {
    defaultValues = formDefaultObject;
  } else {
    // eslint-disable-next-line no-lonely-if
    if (isComponentRepeating(component)) {
      const numberToShowFromStart = getMinNumberOfRepeatingToShow(component);
      defaultValues[component.name] = generateRepeatingObject(
        numberToShowFromStart,
        formDefaultObject,
      );
    } else {
      defaultValues[component.name] = formDefaultObject;
    }
  }

  // remove surrounding container in or data structure
  if (isComponentContainer(component)) {
    return removeRootObject(defaultValues);
  }

  return defaultValues;
};

export const createDefaultValuesFromComponents = (
  components: FormComponent[] | undefined,
): { [p: string]: any } => {
  const formDefaultValuesArray = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => createDefaultValuesFromComponent(formComponent));
  return Object.assign({}, ...formDefaultValuesArray);
};

export const createDefaultValuesFromFormSchema = (
  formSchema: FormSchema,
  existingRecordData: RecordData | undefined = undefined,
) => {
  let defaultValues = createDefaultValuesFromComponent(formSchema.form);
  if (existingRecordData !== undefined) {
    defaultValues = mergeObjects(defaultValues, existingRecordData);
  }
  return defaultValues;
};

export const mergeObjects = (
  target: RecordData,
  overlay: RecordData,
): RecordData => {
  Object.entries(overlay).forEach(([key]) => {
    if (Object.hasOwn(overlay, key)) {
      if (
        typeof overlay[key] === 'object' &&
        overlay[key] !== null &&
        !Array.isArray(overlay[key])
      ) {
        // Recursively merge nested objects
        target[key] = mergeObjects(target[key] || {}, overlay[key]);
      } else if (Array.isArray(overlay[key])) {
        // Handle arrays
        target[key] = mergeArrays(target[key] || [], overlay[key]);
      } else {
        // Assign non-object values directly
        target[key] = overlay[key];
      }
    }
  });
  return target;
};

export const mergeArrays = (target: any[], overlay: any[]): any[] => {
  const result = [...target];

  overlay.forEach((item, index) => {
    if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
      result[index] = item;
    }
  });

  return result;
};

const checkIfComponentHasValue = (componentValue: string) => {
  return getValues(componentValue) !== '';
};
