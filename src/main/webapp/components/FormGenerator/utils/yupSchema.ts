/*
 * Copyright 2024 Uppsala University Library
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

import { AnyObject, ObjectSchema, ObjectShape, TestConfig } from 'yup';
import * as yup from 'yup';
import {
  FormAttributeCollection,
  FormComponent,
  FormComponentRepeat,
  FormNumberValidation,
  FormRegexValidation,
  FormSchema,
} from '../types';
import {
  checkForSiblingValue,
  isComponentContainer,
  isComponentGroup,
  isComponentRepeating,
  isComponentRequired,
  isComponentSingularAndOptional,
  isComponentValidForDataCarrying,
  isParentGroupOptional,
  isSiblingComponentRequired,
} from './helper';

export const generateYupSchemaFromFormSchema = (formSchema: FormSchema) => {
  const rule = createYupValidationsFromComponent(formSchema.form);
  const obj = Object.assign({}, ...[rule]) as ObjectShape;
  // console.log('obj', obj);
  return yup.object().shape(obj);
};

export const generateYupSchema = (
  components: FormComponent[] | undefined,
  parentGroupOptional: boolean = false,
) => {
  const validationsRules = (components ?? [])
    .filter(isComponentValidForDataCarrying)
    .map((formComponent) =>
      createYupValidationsFromComponent(formComponent, parentGroupOptional),
    );

  const obj = Object.assign({}, ...validationsRules) as ObjectShape;
  return yup.object().default({}).shape(obj);
};

export const createYupValidationsFromComponent = (
  component: FormComponent,
  parentComponentRepeating: boolean = false,
) => {
  let validationRule: {
    [x: string]: any;
  } = {};
  // remove surrounding container in yup validation structure
  if (isComponentContainer(component)) {
    const validationsRules = (component.components ?? [])
      .filter(isComponentValidForDataCarrying)
      .map((formComponent) => createYupValidationsFromComponent(formComponent));
    validationRule = Object.assign({}, ...validationsRules);
    return validationRule;
  }
  // eslint-disable-next-line no-lonely-if
  if (isComponentRepeating(component)) {
    if (isComponentGroup(component)) {
      const innerObjectSchema = generateYupSchema(
        component.components,
        isParentGroupOptional(component) || parentComponentRepeating,
      );
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
      const extendedSchema = yup.object().shape({
        value: createValidationFromComponentType(component),
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;

      validationRule[component.name] = createYupArrayFromSchema(
        extendedSchema,
        component.repeat,
      );
    }
  } else {
    // non-repeating group
    // eslint-disable-next-line no-lonely-if
    if (isComponentGroup(component)) {
      const innerSchema = generateYupSchema(
        component.components,
        parentComponentRepeating,
      );
      validationRule[component.name] = yup.object().shape({
        ...innerSchema.fields,
        ...createValidationForAttributesFromComponent(component),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
    } else {
      validationRule[component.name] = yup.object().shape({
        value: createValidationFromComponentType(
          component,
          false,
          parentComponentRepeating,
        ),
        ...createValidationForAttributesFromComponent(
          component,
          isComponentRepeating(component),
          isSiblingComponentRequired(component),
        ),
      }) as ObjectSchema<{ [x: string]: unknown }, AnyObject>;
    }
  }

  return validationRule;
};

export const createValidationForAttributesFromComponent = (
  component: FormComponent,
  siblingRepeat?: boolean,
  siblingRequired2?: boolean,
) => {
  const attributeValidation =
    component.attributes?.map(
      (attributeCollection: FormAttributeCollection) => ({
        [`_${attributeCollection.name}`]: createValidationFromComponentType(
          attributeCollection,
          true,
          isComponentRequired(component),
          siblingRepeat,
          siblingRequired2,
        ),
      }),
    ) ?? [];
  return {
    ...Object.assign({}, ...attributeValidation),
  };
};

export const createYupArrayFromSchema = (
  schema:
    | ObjectSchema<{ [x: string]: unknown }, AnyObject, {}, 'd'>
    | ObjectSchema<{ [x: string]: unknown }, AnyObject>,
  repeat: FormComponentRepeat | undefined,
) => {
  return yup
    .array()
    .of(schema)
    .min(repeat?.repeatMin ?? 1)
    .max(repeat?.repeatMax ?? 1);
};

export const createValidationFromComponentType = (
  component: FormComponent | FormAttributeCollection,
  isAttribute?: boolean,
  isParentRequired?: boolean,
  siblingRepeat?: boolean,
  siblingRequired?: boolean,
) => {
  switch (component.type) {
    case 'textVariable':
      return createYupStringRegexpSchema(
        component as FormComponent,
        isParentRequired,
      );
    case 'numberVariable':
      return createYupNumberSchema(
        component as FormComponent,
        isParentRequired,
      );
    default: // collectionVariable, recordLink
      return createYupStringSchema(
        component as FormComponent,
        isAttribute,
        isParentRequired,
        siblingRepeat,
        siblingRequired,
      );
  }
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
const createYupStringRegexpSchema = (
  component: FormComponent,
  isParentComponentOptional: boolean = false,
) => {
  const regexpValidation = component.validation as FormRegexValidation;

  // check if siblings have values
  // .test('something', function (value, context) {
  //     return (
  //       context.parent.value === null || context.parent.value === ''
  //     );
  //   })

  if (isParentComponentOptional) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        'Invalid input format',
      );
  }

  if (isComponentRepeating(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .matches(
        new RegExp(regexpValidation.pattern ?? '.+'),
        'Invalid input format',
      );
  }

  return yup
    .string()
    .matches(
      new RegExp(regexpValidation.pattern ?? '.+'),
      'Invalid input format',
    );
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
export const createYupNumberSchema = (
  component: FormComponent,
  isParentComponentOptional: boolean = false,
) => {
  const numberValidation = component.validation as FormNumberValidation;
  const { numberOfDecimals, min, max } = numberValidation;

  const testDecimals: TestConfig<string | null | undefined, AnyObject> = {
    name: 'decimal-places',
    message: 'Invalid number of decimals', // todo translation
    params: { numberOfDecimals },
    test: (value) => {
      if (!value) return true;
      const decimalPlaces = (value.split('.')[1] || []).length;
      return decimalPlaces === numberOfDecimals;
    },
  };

  const testMin: TestConfig<string | null | undefined, AnyObject> = {
    name: 'min',
    message: 'Invalid range (min)',
    params: { min },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return min <= numValue;
    },
  };

  const testMax: TestConfig<string | null | undefined, AnyObject> = {
    name: 'max',
    message: 'Invalid range (max)',
    params: { max },
    test: (value) => {
      if (!value) return true;
      const numValue = parseFloat(value);
      return max >= numValue;
    },
  };

  if (isParentComponentOptional) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull
          ? field
              .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
              .test(testDecimals)
              .test(testMax)
              .test(testMin)
          : field,
      );
  }

  if (isComponentSingularAndOptional(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull
          ? field
              .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
              .test(testDecimals)
              .test(testMax)
              .test(testMin)
          : field,
      );
  }

  return yup
    .string()
    .matches(/^[1-9]\d*(\.\d+)?$/, { message: 'Invalid format' })
    .test(testDecimals)
    .test(testMin)
    .test(testMax);
};

/**
 * @privateRemarks
 *
 * OBS! In the Yup library, the transform method is executed after the validation process.
 * The purpose of the transform method is to allow you to modify the value after it has passed validation but before it is returned
 */
const createYupStringSchema = (
  component: FormComponent,
  isAttribute: boolean = false,
  isParentComponentOptional: boolean = false,
  variableForAttributeRepeat: boolean = false,
  siblingComponentRequired: boolean = false,
) => {
  // Kolla syskonens värde
  // Sätt yup.sting().nullable() om värdet är null
  console.log('cYSS', component.name, siblingComponentRequired);
  if (isComponentRepeating(component)) {
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull[0] ? field.required('not valid') : field,
      );
  }

  // yup.object().shape({
  //   showEmail: yup.boolean(),
  //   email: yup
  //     .string()
  //     .email()
  //     .when('showEmail', {
  //       is: true,
  //       then: yup.string().required('Must enter email address'),
  //     }),
  // });

  if (isParentComponentOptional && isAttribute && siblingComponentRequired) {
    console.log(component.name, 'here');
    return yup.string().when('value', ([value]) => {
      console.log('value', component.name, value);
      // return value !== null || value !== ''
      //   ? yup.string().required()
      //   : yup.string().nullable();
      if (value === null || value === '') {
        console.log('florb');
        return yup.string().nullable();
      }
      if (value !== null || value !== '') {
        console.log('blorb');
        return yup.string().required();
      }
    });
  }

  if (isParentComponentOptional && isAttribute && !variableForAttributeRepeat) {
    console.log(component.name, 'here instead');
    return yup.string().required();
  }

  if (isParentComponentOptional) {
    console.log(component.name, 'here instead 3');
    return yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .when('$isNotNull', (isNotNull, field) =>
        isNotNull[0] ? field.required('not valid') : field,
      );
  }

  if (isAttribute && !isParentComponentOptional) {
    console.log(component.name, 'here instead 4');
    return yup.string().when('value', ([value]) => {
      return value !== null || value !== ''
        ? yup
            .string()
            .nullable()
            .test('something', function (value, context) {
              return (
                context.parent.value === null ||
                context.parent.value === '' ||
                !checkForSiblingValue(context.from[0].value)

                // !checkForSiblingValue(
                //   context.from[context.from.length - 2].value,
                // )
              );
            })
        : yup.string().required();
    });
  }

  return yup.string().required();
};
