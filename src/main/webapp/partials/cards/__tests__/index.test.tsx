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

import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CreatePublicationCard } from '../CreatePublicationCard';
import { reduxRender } from '../../../utils/testUtils';
import { ListPublicationsCard } from '../ListPublicationsCard';

/**
 * @vitest-environment jsdom
 */

const setItemSpy = vi.spyOn(Storage.prototype, 'getItem');

afterEach(() => {
  localStorage.clear();
});

describe('CreatePublicationCard', () => {
  it('renders CreatePublicationCard', () => {
    reduxRender(
      <MemoryRouter initialEntries={['/']}>
        <CreatePublicationCard />
      </MemoryRouter>,
    );
    const administreraText = screen.getByText(
      'divaClient_createPublicationTypeText',
      { exact: false },
    );
    screen.debug()
    expect(administreraText).toBeInTheDocument();
  });

  it('renders ListPublicationsCard', () => {
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
    const administreraText = screen.getByText(
      'divaClient_listPublicationsText',
      { exact: false },
    );
    expect(administreraText).toBeInTheDocument();
  });
});
