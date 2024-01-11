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
import { Dialog } from '../Dialog';

/**
 * @vitest-environment jsdom
 */

describe('<Dialog />', () => {
  test('Renders with title and body content', () => {
    render(
      <Dialog
        title='test-title'
        closeButton={false}
        open
      >
        test-content
      </Dialog>,
    );

    const dialogTitle = screen.getByRole('heading', { name: 'test-title' });
    expect(dialogTitle).toBeInTheDocument();

    const dialogContent = screen.getByText('test-content');
    expect(dialogContent).toBeInTheDocument();
  });
});
