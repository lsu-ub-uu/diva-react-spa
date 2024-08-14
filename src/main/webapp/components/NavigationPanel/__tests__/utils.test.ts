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

/**
 * @vitest-environment jsdom
 */

import {
  flattenObject,
  getLastKeyFromString,
  hasLinkValues,
  toShortString,
} from '../utils';
import { formDefWithTwoTextVariableWithModeOutput } from '../../../__mocks__/data/formDef';
import { FormSchema } from '../../FormGenerator/types';

const coraRecord = {
  id: 'divaOutput:519333261463755',
  recordType: 'divaOutput',
  validationType: 'someValidationTypeId',
  createdAt: '2023-10-11T09:24:30.511487Z',
  createdBy: 'coraUser:490742519075086',
  userRights: ['read', 'update', 'index', 'delete'],
  updated: [],
  data: {
    someRootNameInData: {
      someTextVar: {
        value: 'someTestText',
      },
    },
  },
};

const coraRecord2 = {
  id: 'divaOutput:519333261463755',
  recordType: 'divaOutput',
  validationType: 'someValidationTypeId',
  createdAt: '2023-10-11T09:24:30.511487Z',
  createdBy: 'coraUser:490742519075086',
  userRights: ['read', 'update', 'index', 'delete'],
  updated: [],
  data: {
    someRootNameInData: {
      someTextVar: {
        value: 'someTestText',
      },
      someOtherTextVar: {
        value: 'someOtherTestText',
      },
    },
  },
};

describe('hasLinkValue', () => {
  it('returns a coraSchema for one variable without variables with no data', () => {
    const actual = hasLinkValues(
      formDefWithTwoTextVariableWithModeOutput as FormSchema,
      coraRecord.data,
    );
    expect(actual).toStrictEqual([
      {
        name: 'someTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataTextVarText',
        validation: { type: 'regex', pattern: '.*' },
        repeat: { repeatMin: 1, repeatMax: 1 },
      },
    ]);
  });
  it('returns a coraSchema for two variables without variables with no data', () => {
    const actual = hasLinkValues(
      formDefWithTwoTextVariableWithModeOutput as FormSchema,
      coraRecord2.data,
    );
    expect(actual).toStrictEqual([
      {
        name: 'someTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataTextVarText',
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
      {
        name: 'someOtherTextVar',
        type: 'textVariable',
        mode: 'output',
        inputType: 'input',
        tooltip: {
          title: 'exampleMetadataTextVarText',
          body: 'exampleMetadataTextVarDefText',
        },
        label: 'someMetadataOtherTextVarText',
        validation: {
          type: 'regex',
          pattern: '.*',
        },
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
      },
    ]);
  });
});
describe('flattenObj', () => {
  it(' returns flattened object with one variable', () => {
    const actual = flattenObject(coraRecord.data);

    expect(actual).toStrictEqual({
      'someRootNameInData.someTextVar.value': 'someTestText',
    });
  });

  it(' returns flattened object with two variable', () => {
    const actual = flattenObject(coraRecord2.data);

    expect(actual).toStrictEqual({
      'someRootNameInData.someOtherTextVar.value': 'someOtherTestText',
      'someRootNameInData.someTextVar.value': 'someTestText',
    });
  });
});
describe('toShortString', () => {
  it(' returns toShortString for one variable', () => {
    const actual = toShortString({
      'someRootNameInData.someTextVar.value': 'someTestText',
    });

    expect(actual).toStrictEqual('someRootNameInData.someTextVar');
  });

  it(' returns toShortString for two variables', () => {
    const actual = toShortString({
      'someRootNameInData.someOtherTextVar.value': 'someOtherTestText',
      'someRootNameInData.someTextVar.value': 'someTestText',
    });

    expect(actual).toStrictEqual([
      'someRootNameInData.someOtherTextVar',
      'someRootNameInData.someTextVar',
    ]);
  });
});
describe('getLastKeyFromString', () => {
  it(' returns one getLastKeyFromString', () => {
    const actual = getLastKeyFromString(['someRootNameInData.someTextVar']);

    expect(actual).toStrictEqual(['someTextVar']);
  });

  it(' returns two getLastKeyFromString', () => {
    const actual = getLastKeyFromString([
      'someRootNameInData.someOtherTextVar',
      'someRootNameInData.someTextVar',
    ]);

    expect(actual).toStrictEqual(['someOtherTextVar', 'someTextVar']);
  });
});
