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

import recordManuscript from '../../__mocks__/coraRecordManuscript.json';
import { transformRecord } from '../transformRecord';
import { RecordWrapper } from '../../utils/cora-data/CoraData';

describe('transformRecord', () => {
  it('should return a record id', () => {
    const transformData = transformRecord(recordManuscript as RecordWrapper);
    const expected =
    {
      id: 'divaOutput:519333261463755',
      recordType: 'divaOutput',
      validationType: 'manuscript',
      createdAt: '2023-10-11T09:24:30.511487Z',
      createdBy: 'coraUser:490742519075086',
      userRights: [
        'read',
        'update',
        'index',
        'delete'
      ],
      updated: [
        {
          updateAt: '2023-10-11T09:24:30.511487Z',
          updatedBy: 'coraUser:490742519075086'
        },
        {
          updateAt: '2023-10-18T09:09:13.554736Z',
          updatedBy: '161616'
        },
        {
          updateAt: '2023-10-26T12:33:22.260532Z',
          updatedBy: '161616'
        },
        {
          updateAt: '2023-10-26T12:35:28.748398Z',
          updatedBy: '161616'
        },
        {
          updateAt: '2023-10-26T12:35:40.545698Z',
          updatedBy: '161616'
        },
        {
          updateAt: '2023-10-26T12:35:52.293623Z',
          updatedBy: '161616'
        }
      ]

    }
    expect(transformData).toStrictEqual(expected);
  });
});
