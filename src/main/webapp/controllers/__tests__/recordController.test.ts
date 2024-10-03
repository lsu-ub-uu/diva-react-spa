/*
 * Copyright 2024 Uppsala University Library
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

import { extractRecordInfoFromData } from '../utils/utils';

describe('aaa', () => {
  it('aaaa', () => {
    const data = {
      values: {
        output: {
          titleInfo: {
            _lang: 'afr',
            title: {
              value: 'en test'
            }
          },
          genre_type_contentType: {
            value: 'ref',
            _type: 'contentType'
          },
          language: {
            languageTerm: [
              {
                value: 'alg',
                _type: 'code',
                _authority: 'iso639-2b'
              }
            ]
          },
          genre_type_outputType: {
            value: 'publication_book-review',
            _type: 'outputType'
          },
          recordInfo: {
            dataDivider: {
              value: 'divaData'
            },
            validationType: {
              value: 'divaOutputSwepub'
            },
            id: [
              {
                value: 'divaOutputSwepub:3727881616799576'
              }
            ],
            type: [
              {
                value: 'divaOutputSwepub'
              }
            ],
            createdBy: [
              {
                value: 'coraUser:490742519075086'
              }
            ],
            tsCreated: [
              {
                value: '2024-10-02T11:31:06.108115Z'
              }
            ],
            updated: [
              {
                tsUpdated: {
                  value: '2024-10-02T11:31:06.108115Z'
                },
                updatedBy: {
                  value: 'coraUser:490742519075086'
                }
              }
            ]
          }
        }
      }
    };
    const actual = extractRecordInfoFromData(data);
    expect(actual).toStrictEqual({
      recordInfo: {
        dataDivider: {
          value: 'divaData'
        },
        validationType: {
          value: 'divaOutputSwepub'
        },
        id: [
          {
            value: 'divaOutputSwepub:3727881616799576'
          }
        ],
        type: [
          {
            value: 'divaOutputSwepub'
          }
        ],
        createdBy: [
          {
            value: 'coraUser:490742519075086'
          }
        ],
        tsCreated: [
          {
            value: '2024-10-02T11:31:06.108115Z'
          }
        ],
        updated: [
          {
            tsUpdated: {
              value: '2024-10-02T11:31:06.108115Z'
            },
            updatedBy: {
              value: 'coraUser:490742519075086'
            }
          }
        ]
      }
    });
  });
});
