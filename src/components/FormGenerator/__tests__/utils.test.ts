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
import { createDefaultValuesFromFormSchema } from '../utils';
import { formDef } from '../../../__mocks__/data/formDef';
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
