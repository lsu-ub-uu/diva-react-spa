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

const createDefaultValue = (component: FormComponent) =>
  component.finalValue ? component.finalValue : '';

export const generateComponentAttributes = (component: FormComponent) => {
  const attributeValues =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]: attributeCollection.finalValue
          ? attributeCollection.finalValue
          : '',
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValues),
  };
};

const generateRepeatingObject = (size: number, obj: unknown): unknown[] => {
  return Array.from(
    { length: size },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_) => obj,
  );
};

export const createDefaultValuesFromComponent = (
  component: FormComponent,
  forceComponentToShow = false,
) => {
  let defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined | any;
  } = {};

  // Repeating - textVariable / numberVariable/ collectionVariable /group
  if (isComponentRepeating(component)) {
    const numberToShowFromStart =
      component.repeat?.minNumberOfRepeatingToShow ?? 0;

    // handle repeating vars
    if (isComponentVariable(component)) {
      const formDefaultObject = {
        value: createDefaultValue(component),
        ...generateComponentAttributes(component),
      };
      defaultValues[component.name] = generateRepeatingObject(
        numberToShowFromStart,
        formDefaultObject,
      );
    }

    // handle repeating groups
    if (isComponentGroup(component)) {
      const compArray = component.components ?? [];
      const formDefaultValues = compArray
        .filter(isComponentValidForData)
        .map((formComponent) =>
          createDefaultValuesFromComponent(formComponent),
        );
      // TODO attributes // ...generateComponentAttributes(component),
      const formDefaultObject = Object.assign({}, ...formDefaultValues);

      if (forceComponentToShow) {
        defaultValues = formDefaultObject;
      } else {
        defaultValues[component.name] = generateRepeatingObject(
          numberToShowFromStart,
          formDefaultObject,
        );
      }
    }
  }

  // NOT repeating - textVariable / numberVariable/ collectionVariable/group
  if (!isComponentRepeating(component) && isComponentValidForData(component)) {
    // run even if it is repeating and also on groups
    if (hasComponentAttributes(component)) {
      if (!isComponentGroup(component)) {
        defaultValues[component.name] = {
          value: createDefaultValue(component),
          ...generateComponentAttributes(component),
        };
      } else {
        // break out this
        const compArray = component.components ?? [];
        const formDefaultValues = compArray
          .filter(isComponentValidForData)
          .map((formComponent) =>
            createDefaultValuesFromComponent(formComponent),
          );
        const subChildValues = Object.assign({}, ...formDefaultValues);

        defaultValues[component.name] = {
          ...subChildValues,
          ...generateComponentAttributes(component),
        };
      }
    } else {
      // variable or group without attribute
      // eslint-disable-next-line no-lonely-if
      if (!isComponentGroup(component)) {
        defaultValues[component.name] = createDefaultValue(component);
      } else {
        // is a group recursively call createDefaultValues for component
        const compArray = component.components ?? [];
        const formDefaultValues = compArray
          .filter(isComponentValidForData)
          .map((formComponent) =>
            createDefaultValuesFromComponent(formComponent),
          );
        defaultValues[component.name] = Object.assign({}, ...formDefaultValues);
      }
    }
  }
  return defaultValues;
};

export const createDefaultValuesFromFormSchema = (formSchema: FormSchema) => {
  const formDefaultValues = formSchema.components
    .filter(isComponentValidForData)
    .map((formComponent) => createDefaultValuesFromComponent(formComponent));
  return Object.assign({}, ...formDefaultValues);
};
