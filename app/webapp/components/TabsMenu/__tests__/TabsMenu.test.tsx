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
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { TabsMenu } from '../../index';
import { reduxRender } from '../../../utils/testUtils';

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
    reduxRender(
      <MemoryRouter>
        <TabsMenu />
      </MemoryRouter>,
    );
    waitFor(async () => {
      const tabs = await screen.findAllByRole('tab');
      expect(tabs).toHaveLength(3);

      const tabsTexts = tabs.map((element) => element.id);
      expect(tabsTexts).toEqual([
        'Registrera & hantera',
        'Administrera',
        'Mina publikationer & projekt',
      ]);
    });
  });
  it('Tabs change when clicked', async () => {
    reduxRender(
      <MemoryRouter>
        <TabsMenu />
      </MemoryRouter>,
    );
    const user = userEvent.setup();

    const administrera = screen.getByRole('tab', {
      name: /administrera/i,
    });

    await user.click(administrera);
    const administreraText = screen.getByText('Administrera');
    expect(administreraText).toHaveTextContent('Administrera');
  });
  it('Tabs change when clicked and then back when clicked again', async () => {
    reduxRender(
      <MemoryRouter>
        <TabsMenu />
      </MemoryRouter>,
    );
    const user = userEvent.setup();

    const registrera = screen.getByRole('tab', {
      name: /Registrera & hantera/i,
    });
    const administrera = screen.getByRole('tab', {
      name: /administrera/i,
    });
    expect(registrera).toBeInTheDocument();

    await user.click(administrera);
    const administreraText = screen.getByText('Administrera');
    expect(administreraText).toHaveTextContent('Administrera');

    await user.click(registrera);
    const registreraText = screen.getByText('Registrera & hantera');
    expect(registreraText).toHaveTextContent('Registrera & hantera');
  });
});
