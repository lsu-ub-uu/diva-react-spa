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
 */

import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { CreatePublicationCard, ListPublicationsCard } from '@/partials';
import { reduxRender } from '@/utils/testUtils';

const divaOutputs = [
  {
    id: 'divaOutput:2063456157227510',
    recordType: 'divaOutput',
    validationType: 'preprint',
    createdAt: '2024-05-24T08:24:54.549460Z',
    createdBy: '161616',
    updated: [{ updateAt: '2024-05-24T08:24:54.549460Z', updatedBy: '161616' }],
    userRights: ['read'],
    data: {
      divaOutput: {
        domain: { value: 'fhs' },
        outputType: { outputType: { value: 'artisticOutput' } },
        title: { mainTitle: { value: 'asdasd' }, _language: 'ace' },
      },
    },
  },
];

const validationTypes = [
  { value: 'thesisManuscript', label: 'thesisManuscriptText' },
  { value: 'preprint', label: 'preprintText' },
  { value: 'divaOutput', label: 'divaOutputText' },
];

let mockAxios: MockAdapter;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);

  mockAxios.onGet('/divaOutputs').reply(200, divaOutputs);
  mockAxios.onGet('/validationTypes').reply(200, validationTypes);
});

afterEach(() => {
  mockAxios.restore();
  localStorage.clear();
});

describe('CreatePublicationCard', () => {
  it('renders CreatePublicationCard', async () => {
    reduxRender(
      <MemoryRouter initialEntries={['/']}>
        <CreatePublicationCard />
      </MemoryRouter>,
    );
    waitFor(async () => {
      const administreraText = await screen.findByText(
        'divaClient_createPublicationTypeText',
        { exact: false },
      );
      expect(administreraText).toBeInTheDocument();
    });
  });

  it('renders ListPublicationsCard', async () => {
    reduxRender(
      <MemoryRouter initialEntries={['/']}>
        <ListPublicationsCard />
      </MemoryRouter>,
      {
        preloadedState: {
          publications: {
            publications: [
              {
                id: '123',
                title: 'title',
                validationType: 'validationType',
                createdAt: '2023-03-02T09:01:59.915304Z',
                createdBy: 'user123',
                userRights: ['read', 'write'],
              },
            ],
            isLoading: false,
            isError: false,
            message: '',
          },
        },
      },
    );

    waitFor(async () => {
      const administreraText = await screen.findByText(
        'divaClient_listPublicationsText',
        { exact: false },
      );
      expect(administreraText).toBeInTheDocument();
    });
  });
});
