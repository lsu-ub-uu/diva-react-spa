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
import { FormAttributeCollection, FormComponent, FormSchema } from './types';

export const hasComponentAttributes = (component: FormComponent) =>
  component.attributes ? component.attributes.length > 0 : false;

export const isComponentVariable = (component: FormComponent) =>
  ['numberVariable', 'textVariable', 'collectionVariable'].includes(
    component.type,
  );

export const isComponentGroup = (component: FormComponent) =>
  component.type === 'group';

export const isComponentValidForData = (component: FormComponent) =>
  isComponentVariable(component) || isComponentGroup(component);

export const isComponentTextVariable = (component: FormComponent) =>
  component.type === 'textVariable';

export const isComponentNumberVariable = (component: FormComponent) =>
  component.type === 'numberVariable';

export const isComponentCollectionVariable = (component: FormComponent) =>
  component.type === 'collectionVariable';

export const isComponentRepeating = (component: FormComponent) =>
  !(component.repeat?.repeatMax === 1 && component.repeat?.repeatMin === 1);

export const isComponentOptional = (component: FormComponent) =>
  component.repeat?.repeatMin === 0 ?? false;

export const generateComponentAttributes = (component: FormComponent) => {
  const componentDefaultValue = {
    value: component.finalValue ? component.finalValue : '',
  };

  const attributeValues =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]: attributeCollection.finalValue
          ? attributeCollection.finalValue
          : '',
      }),
    ) ?? [];
  return {
    ...componentDefaultValue,
    ...Object.assign({}, ...attributeValues),
  };
};

export const createDefaultValuesFromComponent = (component: FormComponent) => {
  const defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined | any;
  } = {};

  // Repeating - textVariable / numberVariable/ collectionVariable
  if (isComponentRepeating(component)) {
    const numberToShowFromStart =
      component.repeat?.minNumberOfRepeatingToShow ?? 0;
    if (isComponentVariable(component)) {
      defaultValues[component.name] = Array.from(
        { length: numberToShowFromStart },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_) => ({
          value: component.finalValue ? component.finalValue : '',
        }),
      );
    }
  }

  // NOT repeating - textVariable / numberVariable/ collectionVariable/group
  if (!isComponentRepeating(component) && isComponentValidForData(component)) {
    // run even if it is repeating and also on groups
    if (hasComponentAttributes(component)) {
      defaultValues[component.name] = generateComponentAttributes(component);
    } else {
      // variable or group without attribute
      // eslint-disable-next-line no-lonely-if
      if (!isComponentGroup(component)) {
        defaultValues[component.name] = component.finalValue
          ? component.finalValue
          : '';
      } else {
        // is a group recursively call createDefaultValues for component
        const compArray = component.components ?? [];
        const formDefaultValues = compArray
          .filter(isComponentValidForData)
          .map(createDefaultValuesFromComponent);
        defaultValues[component.name] = Object.assign({}, ...formDefaultValues);
      }
    }
  }
  return defaultValues;
};

export const createDefaultValuesFromFormSchema = (formSchema: FormSchema) => {
  const formDefaultValues = formSchema.components
    .filter(isComponentValidForData)
    .map(createDefaultValuesFromComponent);
  return Object.assign({}, ...formDefaultValues);
};
