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

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { createRemixStub } from '@remix-run/testing';
import { formDefWithTextVar } from '@/__mocks__/data/formDef';
import { TabsMenu } from '@/components/TabsMenu/TabsMenu';

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: TabsMenu,
    loader() {
      return {
        validationTypes: [],
        searchForm: formDefWithTextVar,
        recordList: { data: [] },
      };
    },
  },
]);

describe('TabsMenu', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    const divaOutputs = [
      {
        id: 'divaOutput:2063456157227510',
        recordType: 'divaOutput',
        validationType: 'preprint',
        createdAt: '2024-05-24T08:24:54.549460Z',
        createdBy: '161616',
        updated: [
          { updateAt: '2024-05-24T08:24:54.549460Z', updatedBy: '161616' },
        ],
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
    mockAxios.onGet('/divaOutputs').reply(200, divaOutputs);
  });

  afterEach(() => {
    mockAxios.restore();
  });
  it('TabsMenu renders', async () => {
    render(<RemixStub />);
    const tabs = await screen.findAllByRole('tab');
    expect(tabs).toHaveLength(3);

    const tabsTexts = tabs.map((element) => element.id);
    expect(tabsTexts).toEqual([
      'Registrera & hantera',
      'Administrera',
      'Mina publikationer & projekt',
    ]);
  });

  it('Tabs change when clicked', async () => {
    render(<RemixStub />);
    const user = userEvent.setup();
    const administrera = await screen.findByRole('tab', {
      name: /administrera/i,
    });

    await user.click(administrera);
    expect(
      await screen.findByText('divaClient_listPublicationsText'),
    ).toBeInTheDocument();
  });
});
