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

import { getCorrectTitle, transformToTable } from '../actions';

describe('transformToTable', () => {

  it('transforms one divaOutputSwepub', () => {
    const actual = transformToTable([
      {
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'divaOutputSwepub',
        validationType: 'divaOutputSwepub',
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        updated: [
          {
            updateAt: '2024-09-13T11:49:37.288927Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-13T11:49:54.085586Z',
            updatedBy: '161616',
          },
        ],
        userRights: ['read', 'update', 'index', 'delete'],
        data: {
          output: {
            genre_type_outputType: {
              value: 'publication_journal-article',
              _type: 'outputType',
            },
            genre_type_contentType: {
              value: 'vet',
              _type: 'contentType',
            },
            language: {
              languageTerm: [
                {
                  value: 'ach',
                  _authority: 'iso639-2b',
                  _type: 'code',
                },
              ],
            },
            titleInfo: {
              title: {
                value: 'EN utmärkt titel',
              },
              _lang: 'ady',
            },
          },
        },
      },
    ]);
    expect(actual).toStrictEqual([
      {
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'divaOutputSwepub',
        title: 'EN utmärkt titel',
        userRights: ['read', 'update', 'index', 'delete'],
        validationType: 'divaOutputSwepub',
      },
    ]);
  });

  it('transforms one divaOutputSwepub without title', () => {
    const actual = transformToTable([
      {
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'divaOutputSwepub',
        validationType: 'divaOutputSwepub',
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        updated: [
          {
            updateAt: '2024-09-13T11:49:37.288927Z',
            updatedBy: '161616',
          },
          {
            updateAt: '2024-09-13T11:49:54.085586Z',
            updatedBy: '161616',
          },
        ],
        userRights: ['read', 'update', 'index', 'delete'],
        data: {
          output: {
            genre_type_outputType: {
              value: 'publication_journal-article',
              _type: 'outputType',
            },
            genre_type_contentType: {
              value: 'vet',
              _type: 'contentType',
            },
            language: {
              languageTerm: [
                {
                  value: 'ach',
                  _authority: 'iso639-2b',
                  _type: 'code',
                },
              ],
            },
            titleInfo: {
              title: {
                otherValue: 'jdjsdhjsd',
              },
              _lang: 'ady',
            },
          },
        },
      },
    ]);
    expect(actual).toStrictEqual([
      {
        createdAt: '2024-09-13T11:49:37.288927Z',
        createdBy: '161616',
        id: 'divaOutputSwepub:2087392797647370',
        recordType: 'divaOutputSwepub',
        title: '',
        userRights: ['read', 'update', 'index', 'delete'],
        validationType: 'divaOutputSwepub',
      },
    ]);
  });

  describe('getCorrectTitle', () => {
    it('getCorrectTitle 2', () => {
      const data = {
        data: {
          output: {
            titleInfo: {
              title: {
                value: 'EN utmärkt titel',
              },
            },
          },
        },
      };
      const actual = getCorrectTitle(data);
      expect(actual).toBe('EN utmärkt titel');
    });

    it('getCorrectTitle 4', () => {
      const data = {
        data: {
          output: {
            titleInfo: {
              title: {
                otherValue: 'EN utmärkt titel',
              },
            },
          },
        },
      };
      const actual = getCorrectTitle(data);
      expect(actual).toBe(undefined);
    });
  });
});
