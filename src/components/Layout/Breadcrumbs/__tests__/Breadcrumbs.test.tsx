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

import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumbs } from '../Breadcrumbs';

/**
 * @vitest-environment jsdom
 */

describe('<Breadcrumbs />', () => {
  test('Renders', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    const breads = screen.getByText('page1_1');
    expect(breads).toBeInTheDocument();
  });
  test('Can take the user back to home page', () => {
    render(
      <MemoryRouter initialEntries={['/page1/page1_1']}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByText('start').closest('a')).toHaveAttribute('href', '/');
  });
});
