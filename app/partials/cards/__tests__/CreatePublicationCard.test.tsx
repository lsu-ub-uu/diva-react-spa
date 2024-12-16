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
import { createRemixStub } from '@remix-run/testing';
import { CreatePublicationCard } from '@/partials/cards/CreatePublicationCard';

const validationTypes = [
  { value: 'thesisManuscript', label: 'thesisManuscriptText' },
  { value: 'preprint', label: 'preprintText' },
  { value: 'divaOutput', label: 'divaOutputText' },
];

const RemixStub = createRemixStub([
  {
    path: '/',
    Component: CreatePublicationCard,
    loader: () => ({
      validationTypes: validationTypes,
    }),
  },
]);

describe('CreatePublicationCard', () => {
  it('renders CreatePublicationCard', async () => {
    render(<RemixStub />);
    waitFor(async () => {
      const administreraText = await screen.findByText(
        'divaClient_createPublicationTypeText',
        { exact: false },
      );
      expect(administreraText).toBeInTheDocument();
    });
  });
});
