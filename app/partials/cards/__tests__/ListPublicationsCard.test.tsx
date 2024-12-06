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

import { render, screen, waitFor } from '@testing-library/react';

import { createRoutesStub } from 'react-router';
import { CreatePublicationCard } from '@/partials/cards/CreatePublicationCard';

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

const RemixStub = createRoutesStub([
  {
    path: '/',
    Component: CreatePublicationCard,
    loader: () => ({
      recordList: {
        data: divaOutputs,
      },
    }),
  },
]);

describe('ListPublicationsCard', () => {
  it('renders ListPublicationsCard', async () => {
    render(<RemixStub />);

    waitFor(async () => {
      const administreraText = await screen.findByText(
        'divaClient_listPublicationsText',
        { exact: false },
      );
      expect(administreraText).toBeInTheDocument();
    });
  });
});
