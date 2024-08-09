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

import { convertObjectToUrl, renameObjectKey } from '../index';

it('renameObjectKey', () => {
  const actual = renameObjectKey({ value: 'aaaa' }, 'password');
  expect(actual).toEqual({ password: 'aaaa' });
});

describe('convertObjectToUrlQuery', () => {
  const simpleObject = { foo: '1', bar: '2' };
  const nestedObject = {
    search: {
      rows: [
        {
          value: null,
        },
      ],
      start: [
        {
          value: null,
        },
      ],
      include: {
        includePart: {
          genericSearchTerm: [
            {
              value: 'someText',
            },
          ],
          titleSearchTerm: [
            {
              value: 'someOtherText',
            },
          ],
          idSearchTerm: [
            {
              value: 'someThirdText',
            },
          ],
        },
      },
    },
  };
  it('returns an empty string', () => {
    const actual = convertObjectToUrl({});
    expect(actual).toStrictEqual('');
  });
  it('converts a simple object to string', () => {
    const actual = convertObjectToUrl(simpleObject);
    expect(actual).toStrictEqual('foo=1&bar=2');
  });
  it('converts a nested object to string', () => {
    const actual = convertObjectToUrl(nestedObject);
    expect(actual).toStrictEqual(
      '%7B%22search%22%3A%7B%22include%22%3A%7B%22includePart%22%3A%7B%22genericSearchTerm%22%3A%5B%7B%22value%22%3A%22someText%22%7D%5D%2C%22titleSearchTerm%22%3A%5B%7B%22value%22%3A%22someOtherText%22%7D%5D%2C%22idSearchTerm%22%3A%5B%7B%22value%22%3A%22someThirdText%22%7D%5D%7D%7D%7D%7D=',
    );
  });

  // it('converts a nested object to string2', () => {
  //   const actual = decodeURIComponent(convertObjectToUrl(nestedObject));
  //   expect(actual).toStrictEqual(nestedObject);
  // });

});
