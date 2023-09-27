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
import { FormSchema } from '../FormGenerator';

describe('FormGenerator utils', () => {
  test('should take a formDef and make default values object', () => {
    const expectedDefaultValues = {
      someNameInData: '',
    };
    const actualDefaultValues = createDefaultValuesFromFormSchema(
      formDef as FormSchema,
    );
    expect(actualDefaultValues).toStrictEqual(expectedDefaultValues);
  });
});
