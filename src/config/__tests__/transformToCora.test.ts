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

import { transformFormPayloadToCora } from '../transformToCora';
import testFormPayloadWithTitleGroupWithMainTitleTextVar from '../../__mocks__/payloads/divaGuiPostPayload.json';
import { DataGroup } from '../../utils/cora-data/CoraData';

describe('transformToCora', () => {
  it('should take a form payload with someRecordType group containing title group with a mainTitle text variable', () => {
    const expected: DataGroup = {
      name: "someRecordType",
      children: [
        {
          name: "title",
          children: [
            {
              name: "mainTitle",
              value: "someMainTitleValue",
            },
          ],
        },
      ],
    };
    const transformData = transformFormPayloadToCora(testFormPayloadWithTitleGroupWithMainTitleTextVar);
    expect(transformData).toStrictEqual(expected);
  });

});
