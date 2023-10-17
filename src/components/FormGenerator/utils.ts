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
import * as yup from 'yup';
import { AnyObject, ObjectSchema, ObjectShape, TestConfig } from 'yup';
import {
  FormAttributeCollection,
  FormComponent,
  FormComponentRepeat,
  FormNumberValidation,
  FormRegexValidation,
  FormSchema,
} from './types';

export const hasComponentAttributes = (component: FormComponent) =>
  component.attributes ? component.attributes.length > 0 : false;

export const isComponentVariable = (component: FormComponent) =>
  ['numberVariable', 'textVariable', 'collectionVariable'].includes(
    component.type,
  );

export const isComponentGroup = (component: FormComponent) =>
  component.type === 'group';

export const isComponentValidForDataCarrying = (component: FormComponent) =>
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

const createDefaultValue = (
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

const generateRepeatingObject = (size: number, obj: unknown): unknown[] => {
  return Array.from({ length: size }, () => obj);
};

const getMinNumberOfRepeatingToShow = (component: FormComponent) =>
  component.repeat?.minNumberOfRepeatingToShow ?? 0;

export const createDefaultValuesFromComponent = (
  component: FormComponent,
  forceComponentToShow = false,
) => {
  let defaultValues: {
    [x: string]: string | number | ({} | undefined)[] | undefined | any;
  } = {};

  const formDefaultObject = isComponentVariable(component)
    ? {
        value: createDefaultValue(component),
        ...generateComponentAttributes(component),
      }
    : {
        // groups
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        ...createDefaultValuesFromComponents(component.components),
        ...generateComponentAttributes(component),
      };

  if (forceComponentToShow) {
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

export const createDefaultValuesFromFormSchema = (formSchema: FormSchema) => {
  // do we need some more stuff here?
  return createDefaultValuesFromComponents(formSchema.components);
};

/**
 * YUP Validation
 */

const createYupStringRegexpSchema = (component: FormComponent) => {
  const regexpValidation = component.validation as FormRegexValidation;
  return yup
    .string()
    .matches(
      new RegExp(regexpValidation.pattern ?? '.+'),
      'Invalid input format',
    );
};

export const createYupArray = (
  shape: ObjectShape,
  repeat: FormComponentRepeat,
) => {
  return yup
    .array()
    .of(yup.object(shape))
    .min(repeat.repeatMin)
    .max(repeat.repeatMax);
};

export const createYupArrayFromSchema = (
  schema:
    | ObjectSchema<{ [x: string]: unknown }, AnyObject, {}, 'd'>
    | ObjectSchema<{ [x: string]: unknown }, AnyObject>,
  repeat: FormComponentRepeat,
) => {
  return yup.array().of(schema).min(repeat.repeatMin).max(repeat.repeatMax);
};

const createYupNumberSchema = (component: FormComponent) => {
  const numberValidation = component.validation as FormNumberValidation;
  const { numberOfDecimals, min, max } = numberValidation;

  const testDecimals: TestConfig<string | undefined, AnyObject> = {
    name: 'decimal-places',
    message: 'Invalid number of decimals', // todo translation
    params: { numberOfDecimals },
    test: (value) => {
      if (!value) return true;
      const decimalPlaces = (value.split('.')[1] || []).length;
      return decimalPlaces === numberOfDecimals;
    },
  };

  const testMin: TestConfig<string | undefined, AnyObject> = {
    name: 'min',
    message: 'Invalid range (min)',
    params: { min },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return min <= numValue;
    },
  };

  const testMax: TestConfig<string | undefined, AnyObject> = {
    name: 'max',
    message: 'Invalid range (max)',
    params: { max },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return max >= numValue;
    },
  };

  return yup
    .string()
    .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
    .test(testDecimals)
    .test(testMin)
    .test(testMax);
};

const createValidationForAttributesFromComponent = (
  component: FormComponent,
) => {
  const attributeValidation =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]:
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          createValidationFromComponentType(attributeCollection),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValidation),
  };
};

const createValidationFromComponentType = (
  component: FormComponent | FormAttributeCollection,
) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(component as FormComponent);
    case 'numberVariable':
      return createYupNumberSchema(component as FormComponent);
    default: // collectionVariable and attributeCollection
      return yup.string().required();
  }
};

export const createYupValidationsFromComponent = (component: FormComponent) => {
  const validationRule: {
    [x: string]: any;
  } = {};
  if (isComponentRepeating(component)) {
    if (isComponentGroup(component)) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const innerObjectSchema = generateYupSchema(component.components);

      // Create a new schema by merging the existing schema and attribute fields
      const extendedSchema = yup.object().shape({
        ...innerObjectSchema.fields,
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

      validationRule[component.name] = createYupArrayFromSchema(
        extendedSchema,
        component.repeat,
      );
    } else {
      // repeating variables
      const innerObjectStringSchema = {
        value: createValidationFromComponentType(component),
      };
      validationRule[component.name] = createYupArray(
        innerObjectStringSchema,
        component.repeat,
      );
    }
  } else {
    // Non-repeating
    // eslint-disable-next-line no-lonely-if
    if (isComponentGroup(component)) {
      // non-repeating group
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const innerSchema = generateYupSchema(component.components);
      validationRule[component.name] = yup.object().shape({
        ...innerSchema.fields,
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
    } else {
      const extendedSchema = yup.object().shape({
        value: createValidationFromComponentType(component),
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
      validationRule[component.name] = extendedSchema;
    }
  }
  return validationRule;
};

// this gets called recursively
export const generateYupSchema = (components: FormComponent[] | undefined) => {
  const validationsRules = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) => createYupValidationsFromComponent(formComponent));

  const obj = Object.assign({}, ...validationsRules) as ObjectShape;
  return yup.object().default({}).shape(obj);
};

export const generateYupSchemaFromFormSchema = (formSchema: FormSchema) => {
  return generateYupSchema(formSchema.components);
};
