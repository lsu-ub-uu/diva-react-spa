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

import { cleanJson, removeEmpty } from '../removeEmpty';

describe('RemoveEmpty', () => {
  const data = {
    prop1: 'hello',
    prop2: undefined,
    prop3: null,
    prop4: {
      innerProp: undefined,
      innerProp2: 'world'
    },
    prop5: [],
    prop6: ['a']
  };

  const cleaned = {
    prop1: 'hello',
    prop4: {
      innerProp2: 'world'
    },
    prop5: [],
    prop6: ['a']
  };

  it('should return a data object with properties removed if null or undefined', () => {
    expect(removeEmpty(data)).toStrictEqual(cleaned);
  });
});

describe('CleanJson', () => {
  const data = {
    prop1: 'hello',
    prop2: undefined,
    prop3: null,
    prop4: {
      innerProp: undefined,
      innerProp2: 'world'
    },
    prop5: [],
    prop6: ['a'],
    prop7: { value: null },
    prop8: { test: { value: null }, _attr: '2' }
  };

  const cleaned = {
    prop1: 'hello',
    prop4: {
      innerProp2: 'world'
    },
    prop6: ['a'],
    prop8: { _attr: '2' }
  };

  it('should return a data object with cleaned json ready to be converted to cora format', () => {
    expect(cleanJson(data)).toStrictEqual(cleaned);
  });
});
