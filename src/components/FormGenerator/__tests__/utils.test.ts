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

import { test } from 'vitest';
import {
  createDefaultValuesFromComponent,
  createDefaultValuesFromFormSchema,
  generateYupSchemaFromFormSchema,
} from '../utils';
import {
  formComponentGroup,
  formComponentGroupAndTextVariableWithinGroup,
  formComponentGroupWithChildren,
  formComponentGroupWithinGroupWithAttributes,
  formComponentRepeatingTextVariable,
  formDef,
  formDefRealDemo,
  formDefRealDemoWithAttributes,
  formDefRealDemoWithFinalValues,
  formDefRealDemoWithRepeatingGroups,
  formDefRealDemoWithRepeatingVars,
  formDefWithOneGroupHavingTextVariableAsChild,
  formDefWithRepeatingCollectionVar,
  formDefWithRepeatingGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroup,
  formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes,
  formDefWithTwoRepeatingVarsAndCollectionVar,
} from '../../../__mocks__/data/formDef';
import { FormSchema } from '../types';

const numberValidationTests = (
  min: number,
  max: number,
  numberOfDecimals: number,
) => [
  { name: 'matches', params: { regex: /^[1-9]\d*(\.\d+)?$/ } },
  { name: 'decimal-places', params: { numberOfDecimals } },
  { name: 'min', params: { min } },
  { name: 'max', params: { max } },
];

const stringValidationTests = (regex: RegExp) => [
  { name: 'matches', params: { regex } },
];

const requiredValidationTests = [{ name: 'required' }];

const minMaxValidationTests = (min: number, max: number) => [
  { name: 'min', params: { min } },
  { name: 'max', params: { max } },
];

describe('FormGenerator utils defaultValues', () => {
  test('createDefaultValuesFromFormSchema should take a formDef and make default values object', () => {
    const expectedDefaultValues = {
      someNameInData: {
        value: '',
      },
      someNumberVariableNameInData: {
        value: '',
      },
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDef as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  // group
  test('createDefaultValuesFromFormSchema should take a more complex formDef with groups and make default values object', () => {
    const expectedDefaultValues = {
      bookTitle: {
        value: '',
      },
      keeptHis: [
        {
          value: '',
        },
      ],
      firstChildGroup: {
        exampleNumberVar: {
          value: '',
        },
        exampleTextVar: {
          value: '',
        },
      },
      recordInfo: {},
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDefRealDemo as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('createDefaultValuesFromFormSchema should take a more complex formDef with repeating groups and make default values object', () => {
    const expectedDefaultValues = {
      bookTitle: {
        value: '',
      },
      keeptHis: [
        {
          value: '',
        },
      ],
      firstChildGroup: [
        {
          exampleNumberVar: {
            value: '',
          },
          exampleTextVar: {
            value: '',
          },
        },
        {
          exampleNumberVar: {
            value: '',
          },
          exampleTextVar: {
            value: '',
          },
        },
      ],
      recordInfo: {},
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDefRealDemoWithRepeatingGroups as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('createDefaultValuesFromComponent should construct a default value object for repeating component', () => {
    const expectedDefaultValues = {
      exampleNumberVar: {
        value: '',
      },
      exampleTextVar: {
        value: '',
      },
    };
    const actualDefaultValues = createDefaultValuesFromComponent(
      formComponentGroup,
      true,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('createDefaultValuesFromComponent should construct a default value object for complex children in repeating component', () => {
    const expectedDefaultValues = {
      exampleNumberVar: [
        {
          value: '',
        },
      ],
      exampleTextVar: [
        {
          value: '',
        },
        {
          value: '',
        },
      ],
    };
    const actualDefaultValues = createDefaultValuesFromComponent(
      formComponentGroupWithChildren,
      true,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('createDefaultValuesFromComponent should construct a default value object for group within group having repeating vars and minNumberToShow set', () => {
    const expectedDefaultValues = {
      exampleTextVar: {
        value: '',
      },
      innerChildGroup: [
        {
          exampleNumberVar: [
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
          ],
          exampleTextVar: {
            value: '',
          },
        },
        {
          exampleNumberVar: [
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
            {
              value: '12',
            },
          ],
          exampleTextVar: {
            value: '',
          },
        },
      ],
    };
    const actualDefaultValues = createDefaultValuesFromComponent(
      formComponentGroupAndTextVariableWithinGroup,
      true,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('createDefaultValuesFromComponent should construct a default value object for group with attributes and attributes for vars within group', () => {
    const expectedDefaultValues = {
      _firstChildGroupColor: 'yellow',
      _firstChildGroupSecondAttribute: '',
      secondChildGroup: [
        {
          exampleNumberVar: {
            value: '',
          },
          exampleTextVar: {
            _colour: '',
            value: '',
          },
        },
      ],
    };
    const actualDefaultValues = createDefaultValuesFromComponent(
      formComponentGroupWithinGroupWithAttributes,
      true,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('createDefaultValuesFromComponent should construct a default value object for textVariable component', () => {
    const expectedDefaultValues = {
      value: '',
    };
    const actualDefaultValues = createDefaultValuesFromComponent(
      formComponentRepeatingTextVariable,
      true,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('createDefaultValuesFromFormSchema should construct a default value object for one single group having textVar as child component', () => {
    const expectedDefaultValues = {
      someChildGroupNameInData: {
        someNameInData: {
          value: '',
        },
      },
    };

    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDefWithOneGroupHavingTextVariableAsChild as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  // finalValues
  test('createDefaultValuesFromFormSchema should take a more complex formDef with finalValue default values object', () => {
    const expectedDefaultValues = {
      bookTitle: {
        value: 'someFinalValue',
      },
      keeptHis: [
        {
          value: '12',
        },
      ],
      firstChildGroup: {
        exampleNumberVar: {
          value: '55',
        },
        exampleTextVar: {
          value: 'someText',
        },
      },
      recordInfo: {},
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDefRealDemoWithFinalValues as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  // attributes
  test('createDefaultValuesFromFormSchema should take a more complex formDef with groups and attributes and make default values object', () => {
    const expectedDefaultValues = {
      bookTitle: {
        value: '',
        _colour: '',
      },
      keeptHis: [
        {
          value: '',
          _colour: '',
        },
      ],
      firstChildGroup: {
        exampleNumberVar: {
          value: '',
        },
        exampleTextVar: {
          _colour: '',
          _colourAgain: 'pink',
          value: 'exampleFinalValue',
        },
        _groupColour: '',
        _groupColourAgain: 'pink',
      },
      recordInfo: {},
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDefRealDemoWithAttributes as FormSchema,
    );

    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  // repeating vars
  test('createDefaultValuesFromFormSchema should take a more complex formDef with groups and repeating variables and make default values object', () => {
    const expectedDefaultValues = {
      bookTitle: {
        value: '',
      },
      keeptHis: [
        {
          value: '',
          _colour: 'blue',
        },
        {
          value: '',
          _colour: 'blue',
        },
        {
          value: '',
          _colour: 'blue',
        },
        {
          value: '',
          _colour: 'blue',
        },
        {
          value: '',
          _colour: 'blue',
        },
      ],
      firstChildGroup: {
        exampleNumberVar: [
          {
            value: '',
            _colour: 'pink',
          },
          {
            value: '',
            _colour: 'pink',
          },
          {
            value: '',
            _colour: 'pink',
          },
          {
            value: '',
            _colour: 'pink',
          },
          {
            value: '',
            _colour: 'pink',
          },
        ],
        exampleTextVar: [],
      },
      recordInfo: {},
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDefRealDemoWithRepeatingVars as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  test('should take a tree and be able to add full name paths', () => {
    const expected = [
      {
        name: 'person',
        path: 'person',
        components: [
          {
            name: 'name',
            components: [
              {
                name: 'firstName',
                path: 'person.name.firstName',
                components: [],
              },
              {
                name: 'lastName',
                path: 'person.name.lastName',
                components: [],
              },
            ],
            path: 'person.name',
          },
          {
            name: 'age',
            path: 'person.age',
            components: [],
          },
        ],
      },
    ];

    const createFormDefWithPaths = (data: any, parentPath = '') => {
      return data.map((node: any) => {
        const nodePath = `${parentPath}.${node.name}`;
        const components = createFormDefWithPaths(node.components, nodePath);

        return {
          ...node,
          path: nodePath.slice(1),
          components,
        };
      });
    };

    const treeData = {
      name: 'person',
      components: [
        {
          name: 'name',
          components: [
            {
              name: 'firstName',
              components: [],
            },
            {
              name: 'lastName',
              components: [],
            },
          ],
        },
        {
          name: 'age',
          components: [],
        },
      ],
    };

    const actual = createFormDefWithPaths([treeData]);
    expect(actual).toStrictEqual(expected);
  });
});

describe('FormGenerator utils yupSchema', () => {
  test('should return correct validationSchema for one textVar and one numberVar', () => {
    const yupSchema = generateYupSchemaFromFormSchema(formDef as FormSchema);
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someNameInData: {
        type: 'object',
        fields: {
          value: { type: 'string', tests: stringValidationTests(/^[a-zA-Z]$/) },
        },
      },
      someNumberVariableNameInData: {
        type: 'object',
        fields: {
          value: { type: 'string', tests: numberValidationTests(0, 20, 0) },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  test('should return correct validationSchema for two repeating variables', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithTwoRepeatingVarsAndCollectionVar as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someNameInData: {
        type: 'array',
        tests: minMaxValidationTests(0, 2),
        innerType: {
          fields: {
            value: {
              type: 'string',
              tests: stringValidationTests(/^[a-zA-Z]$/),
            },
          },
        },
      },
      someNumberVariableNameInData: {
        type: 'array',
        tests: minMaxValidationTests(1, 5),
        innerType: {
          fields: {
            value: {
              type: 'string',
              tests: numberValidationTests(0, 20, 2),
            },
          },
        },
      },
      colour: {
        type: 'object',
        fields: {
          value: { type: 'string', tests: requiredValidationTests },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  test('should return correct validationSchema for one repeating collectionVariable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingCollectionVar as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      colour: {
        type: 'array',
        tests: minMaxValidationTests(0, 3),
        innerType: {
          fields: {
            value: {
              type: 'string',
              tests: requiredValidationTests,
            },
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  test('should return correct validationSchema for one group having a text variable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithOneGroupHavingTextVariableAsChild as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      someChildGroupNameInData: {
        type: 'object',
        fields: {
          someNameInData: {
            type: 'object',
            fields: {
              value: {
                type: 'string',
                tests: stringValidationTests(/someRegex/),
              },
            },
          },
        },
      },
    };
    expect(actualSchema).toMatchObject(expectedSchema);
  });

  test('should return correct validationSchema for repeating group having a text variable', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroup as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      firstChildGroup: {
        type: 'array',
        tests: minMaxValidationTests(0, 10),
        innerType: {
          fields: {
            exampleNumberVar: {
              type: 'object',
              fields: {
                value: {
                  type: 'string',
                  tests: numberValidationTests(0, 20, 2),
                },
              },
            },
          },
        },
      },
    };

    expect(actualSchema).toMatchObject(expectedSchema);
  });

  test('should return correct validationSchema for repeating group having repeating child group with two name fields', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroupWithRepeatingChildGroup as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      author: {
        type: 'array',
        tests: minMaxValidationTests(1, 10),
        innerType: {
          fields: {
            name: {
              type: 'array',
              tests: minMaxValidationTests(1, 100),
              innerType: {
                fields: {
                  firstName: {
                    type: 'object',
                    fields: {
                      value: {
                        type: 'string',
                      },
                    },
                  },
                  lastName: {
                    type: 'object',
                    fields: {
                      value: {
                        type: 'string',
                      },
                    },
                  },
                  age: {
                    type: 'object',
                    fields: {
                      value: {
                        type: 'string',
                        tests: numberValidationTests(0, 125, 0),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    expect(actualSchema).toMatchObject(expectedSchema);
  });

  test('should return correct validationSchema for repeating group having repeating child group with two name fields and different attributes', () => {
    const yupSchema = generateYupSchemaFromFormSchema(
      formDefWithRepeatingGroupWithRepeatingChildGroupWithAttributes as FormSchema,
    );
    const actualSchema = yupSchema.describe().fields;

    const expectedSchema = {
      grade: {
        type: 'array',
        tests: minMaxValidationTests(1, 12),
        innerType: {
          type: 'object',
          fields: {
            _gradeAttribute: {
              type: 'string',
              tests: requiredValidationTests,
            },
            value: {
              type: 'string',
              tests: numberValidationTests(1, 5, 0),
            },
          },
        },
      },
      nonRepeatingGroup: {
        type: 'object',
        fields: {
          _groupAttribute: {
            type: 'string',
            tests: requiredValidationTests,
          },
        },
      },
      author: {
        type: 'array',
        tests: minMaxValidationTests(1, 10),
        innerType: {
          fields: {
            _colourAttribute: {
              // attribute values are always required
              type: 'string',
              tests: requiredValidationTests,
            },
            name: {
              type: 'array',
              tests: minMaxValidationTests(1, 100),
              innerType: {
                fields: {
                  firstName: {
                    type: 'object',
                    fields: {
                      value: {
                        type: 'string',
                      },
                      _colourAttribute: {
                        type: 'string',
                        tests: requiredValidationTests,
                      },
                    },
                  },
                  lastName: {
                    type: 'object',
                    fields: {
                      value: {
                        type: 'string',
                      },
                    },
                  },
                  age: {
                    type: 'object',
                    fields: {
                      value: {
                        type: 'string',
                        tests: numberValidationTests(0, 125, 0),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    expect(actualSchema).toMatchObject(expectedSchema);
  });
});
