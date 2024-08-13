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

import { hasLinkValues } from '../utils';
import { formDefWithOneRepeatingTextVariableWithModeOutput } from '../../../__mocks__/data/formDef';
import { FormSchema } from '../../FormGenerator/types';

describe('hasLinkValue', () => {
  it('returns a coraSchema without variables with no data', () => {
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
          exampleWrongTextVar: {
            value: 'someTestText',
          },
        },
      },
    };

    const actual = hasLinkValues(
      formDefWithOneRepeatingTextVariableWithModeOutput as FormSchema,
      coraRecord,
    );
    expect(actual).toBe('aaa');
  });
});
