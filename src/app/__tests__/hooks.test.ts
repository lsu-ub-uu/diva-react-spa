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
import { FormSchema } from '../../components/FormGenerator/types';

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
    const expectedFormSchema: FormSchema = {
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'textId345',
        name: 'someNewMetadataGroupNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        tooltip: {
          title: 'textId345',
          body: 'defTextId678',
        },
        components: [
          {
            type: 'text',
            name: 'someText',
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
          {
            type: 'textVariable',
            name: 'someNameInData',
            placeholder: 'someEmptyTextId',
            validation: {
              type: 'regex',
              pattern: 'someRegex',
            },
            repeat: {
              repeatMin: 0,
              repeatMax: 10,
            },
          },
        ],
      },
    };

    const validationType = 'someValidationTypeId';
    const apiUrl = `form/${validationType}/create`;

    mockAxios.onGet(apiUrl).reply(200, expectedFormSchema);

    const { result } = renderHook(() =>
      useCoraFormSchemaByValidationType(validationType, 'create'),
    );

    await waitFor(() => {
      const { schema } = result.current;
      expect(schema).toStrictEqual(expectedFormSchema);
    });
  });

  test('handles 500 server error gracefully', async () => {
    const expected500Response = {
      headers: {},
      request: {},
      status: 500,
    };
    const validationType = 'someFaultyValidationTypeId';
    const apiUrl = `form/${validationType}/create`;
    mockAxios.onGet(apiUrl).reply(500, expected500Response);

    const { result } = renderHook(() =>
      useCoraFormSchemaByValidationType(validationType, 'create'),
    );

    await waitFor(() => {
      const { error, isLoading } = result.current;
      expect(isLoading).toBeFalsy();
      expect(error).toEqual('Request failed with status code 500');
    });
  });
});
