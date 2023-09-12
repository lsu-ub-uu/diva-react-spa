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
import { test, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Autocomplete } from '../Autocomplete';

/**
 * @vitest-environment jsdom
 */

const mockOptions = [
  { id: '1', name: 'Option 1' },
  { id: '2', name: 'Option 2' },
];

describe('<Autocomplete/>', () => {
  test('renders with default placeholder', () => {
    render(
      <Autocomplete
        options={mockOptions}
        placeholder='somePlaceholder'
      />,
    );
    const inputElement = screen.getByPlaceholderText('somePlaceholder');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(
      <Autocomplete
        options={mockOptions}
        placeholder='Custom Placeholder'
      />,
    );
    const inputElement = screen.getByPlaceholderText('Custom Placeholder');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays options when typing in the input', async () => {
    render(<Autocomplete options={mockOptions} />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: 'Option' } });
    const optionElements = screen.getAllByText('Option');
    await waitFor(() => expect(optionElements.length).toBe(2));
  });

  it('displays no options when input does not match any options', async () => {
    render(<Autocomplete options={mockOptions} />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.focus(inputElement);
    fireEvent.change(inputElement, { target: { value: 'No Match' } });
    expect(screen.queryByText('Option 1')).toBeNull();
    expect(screen.queryByText('Option 2')).toBeNull();
  });
});
