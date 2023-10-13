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
} from '../utils';
import {
  formComponentGroup,
  formComponentGroupWithChildren,
  formComponentRepeatingTextVariable,
  formDef,
  formDefRealDemo,
  formDefRealDemoWithAttributes,
  formDefRealDemoWithFinalValues,
  formDefRealDemoWithRepeatingGroups,
  formDefRealDemoWithRepeatingVars,
} from '../../../__mocks__/data/formDef';
import { FormSchema } from '../types';

describe('FormGenerator utils', () => {
  test('createDefaultValuesFromFormSchema should take a formDef and make default values object', () => {
    const expectedDefaultValues = {
      someNameInData: '',
      someNumberVariableNameInData: '',
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDef as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });

  // group
  test('createDefaultValuesFromFormSchema should take a more complex formDef with groups and make default values object', () => {
    const expectedDefaultValues = {
      bookTitle: '',
      keeptHis: [
        {
          value: '',
        },
      ],
      firstChildGroup: {
        exampleNumberVar: '',
        exampleTextVar: '',
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
      bookTitle: '',
      keeptHis: [
        {
          value: '',
        },
      ],
      firstChildGroup: [
        {
          exampleNumberVar: '',
          exampleTextVar: '',
        },
        {
          exampleNumberVar: '',
          exampleTextVar: '',
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
      exampleNumberVar: '',
      exampleTextVar: '',
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

  // finalValues
  test('createDefaultValuesFromFormSchema should take a more complex formDef with finalValue default values object', () => {
    const expectedDefaultValues = {
      bookTitle: 'someFinalValue',
      keeptHis: [
        {
          value: '12',
        },
      ],
      firstChildGroup: {
        exampleNumberVar: '55',
        exampleTextVar: 'someText',
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
        exampleNumberVar: '',
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
      bookTitle: '',
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
        name: 'Root',
        path: 'Root',
        components: [
          {
            name: 'Node1',
            components: [
              {
                name: 'Node11',
                path: 'Root.Node1.Node11',
                components: [],
              },
              {
                name: 'Node12',
                path: 'Root.Node1.Node12',
                components: [
                  {
                    name: 'Node121',
                    path: 'Root.Node1.Node12.Node121',
                    components: [],
                  },
                ],
              },
            ],
            path: 'Root.Node1',
          },
          {
            name: 'Node2',
            path: 'Root.Node2',
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
      name: 'Root',
      components: [
        {
          name: 'Node1',
          components: [
            {
              name: 'Node11',
              components: [],
            },
            {
              name: 'Node12',
              components: [
                {
                  name: 'Node121',
                  components: [],
                },
              ],
            },
          ],
        },
        {
          name: 'Node2',
          components: [],
        },
      ],
    };

    const actual = createFormDefWithPaths([treeData]);
    expect(actual).toStrictEqual(expected);
  });
});
