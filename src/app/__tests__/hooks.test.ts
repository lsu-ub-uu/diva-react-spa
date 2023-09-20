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
import { renderHook, waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { useCoraFormSchemaByValidationType } from '../hooks';

/**
 * @vitest-environment jsdom
 */

describe('useCoraFormSchemaByValidationType', () => {
  let mockAxios: MockAdapter;
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  test('returns schema for validation type', async () => {
    const expected = {
      validationTypeId: 'someValidationTypeId',
      components: [
        {
          type: 'text',
          name: 'someText',
        },
        {
          type: 'input',
          name: 'someNameInData',
          placeholder: 'someEmptyTextId',
          validation: {
            type: 'regex',
            pattern: 'someRegex',
          },
        },
      ],
    };

    const expectedResponse = {
      data: expected,
      headers: {},
      request: {},
      status: 200,
    };

    const apiUrl = 'form/someValidationTypeId';
    mockAxios.onGet(apiUrl).reply(200, expectedResponse);

    const validationType = 'someValidationTypeId';
    const { result } = renderHook(() =>
      useCoraFormSchemaByValidationType(validationType),
    );

    await waitFor(() => {
      const { schema } = result.current;
      expect(schema).toStrictEqual(expected);
    });
  });

  test('handles 500 server error gracefully', async () => {
    const expected500Response = {
      headers: {},
      request: {},
      status: 500,
    };
    const validationType = 'someFaultyValidationTypeId';
    const apiUrl = `form/${validationType}`;
    mockAxios.onGet(apiUrl).reply(500, expected500Response);

    const { result } = renderHook(() =>
      useCoraFormSchemaByValidationType(validationType),
    );

    await waitFor(() => {
      const { error } = result.current;
      expect(error).toEqual('Request failed with status code 500');
    });
  });
});
