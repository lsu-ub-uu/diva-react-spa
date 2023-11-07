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

import {
  transformNewData,
} from '../transformToCora';
import testFormPayloadWithTitleGroupWithMainTitleTextVar from '../../__mocks__/payloads/divaGuiPostPayload.json';
import testFormPayloadWithRepeatingTitle from '../../__mocks__/payloads/divaGuiPostPayloadWithRepeatingTitle.json';
import testFormPayloadWithRepeatingNumberAndTextVar from '../../__mocks__/payloads/divaGuiPostPayloadWithRepeatingNumberAndTextVar.json';
import testFormPayloadWithRepeatingNumberAndTextVarAndChildGroup from '../../__mocks__/payloads/divaGuiPostPayloadWithRepeatingNumberAndTextVarAndChildGroup.json';
import { DataGroup } from '../../utils/cora-data/CoraData';

describe('transformToCora', () => {
  it('should take a form payload with someRecordType group containing title group with a mainTitle text variable', () => {
    const expected: DataGroup = {
      name: 'someRecordType',
      children: [
        {
          name: 'title',
          children: [
            {
              name: 'mainTitle',
              value: 'someMainTitleValue',
            },
          ],
        },
      ],
    };
    const transformData = transformNewData(testFormPayloadWithTitleGroupWithMainTitleTextVar, '');
    expect(transformData).toStrictEqual(expected);
  });

  it('should take a form payload with someRecordType group containing repeating text variable', () => {
    const expected: DataGroup = {
      name: "someRecordType",
      children: [
        {
          repeatId: '0',
          name: "title",
          value: 'value0'
        },
        {
          repeatId: '1',
          name: "title",
          value: 'value1'
        },
      ],
    };
    const transformData = transformNewData(testFormPayloadWithRepeatingTitle, '');
    expect(transformData).toStrictEqual(expected);
  });
  it('should take a form payload with someRecordType group containing repeating text variable and number variable', () => {
    const expected: DataGroup = {
      name: "someRecordType",
      children: [
        {
          name: "exampleNumberVar",
          repeatId: "0",
          value: "12.99"
        },
        {
          name: "exampleNumberVar",
          repeatId: "1",
          value: "1.34"
        },
        {
          name: "exampleTextVar",
          repeatId: "0",
          value: "value0"
        },
        {
          name: "exampleTextVar",
          repeatId: "1",
          value: "value1"
        }
      ]
    };
    const transformData = transformNewData(testFormPayloadWithRepeatingNumberAndTextVar, '');
    expect(transformData).toStrictEqual(expected);
  });

  it('should take a form payload with someRecordType group containing repeating text variable and number variable and childGroup', () => {
    const expected: DataGroup = {
      name: "someRecordType",
      children: [
        {
          name: "exampleNumberVar",
          repeatId: "0",
          value: "12.99"
        },
        {
          name: "exampleNumberVar",
          repeatId: "1",
          value: "1.34"
        },
        {
          name: "exampleTextVar",
          repeatId: "0",
          value: "value0"
        },
        {
          name: "exampleTextVar",
          repeatId: "1",
          value: "value1"
        },
        {
          name: 'someChildGroup',
          children: [
            {
              name: 'mainTitle',
              value: 'someMainTitleValue',
            },
          ],
        },
      ]
    };
    const transformData = transformNewData(testFormPayloadWithRepeatingNumberAndTextVarAndChildGroup, '');
    expect(transformData).toStrictEqual(expected);
  });

});

