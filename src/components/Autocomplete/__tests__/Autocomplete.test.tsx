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

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { Autocomplete, AutoCompleteSearchResultProps } from '../Autocomplete';

/**
 * @vitest-environment jsdom
 */

const mockOptions: AutoCompleteSearchResultProps[] = [
  {
    id: 'nationalSubjectCategory:6325356888554468',
    recordType: 'nationalSubjectCategory',
    validationType: 'nationalSubjectCategory',
    createdAt: '2022-04-22T12:39:17.832481Z',
    createdBy: 'coraUser:4412982402853626',
    updated: [
      {
        updateAt: '2022-04-22T12:39:17.832481Z',
        updatedBy: 'coraUser:4412982402853626',
      },
      {
        updateAt: '2023-03-03T13:25:30.021078Z',
        updatedBy: 'coraUser:490742519075086',
      },
    ],
    userRights: ['read', 'read_incoming_links'],
    data: {
      nationalSubjectCategory: {
        name: {
          language: {
            value: 'sv',
          },
          nationalSubjectCategoryName: {
            value: 'Programvaruteknik',
          },
        },
        alternativeName: {
          nationalSubjectCategoryName: {
            value: 'Software Engineering',
          },
          language: {
            value: 'en',
          },
        },
        subjectCode: {
          value: '10205',
        },
      },
    },
  },
  {
    id: 'nationalSubjectCategory:6325526426473921',
    recordType: 'nationalSubjectCategory',
    validationType: 'nationalSubjectCategory',
    createdAt: '2022-04-22T12:42:07.370400Z',
    createdBy: 'coraUser:4412982402853626',
    updated: [
      {
        updateAt: '2022-04-22T12:42:07.370400Z',
        updatedBy: 'coraUser:4412982402853626',
      },
      {
        updateAt: '2023-03-03T13:25:30.650986Z',
        updatedBy: 'coraUser:490742519075086',
      },
    ],
    userRights: ['read'],
    data: {
      nationalSubjectCategory: {
        name: {
          language: {
            value: 'sv',
          },
          nationalSubjectCategoryName: {
            value:
              'Sociologi (exklusive socialt arbete, socialpsykologi och socialantropologi)',
          },
        },
        alternativeName: {
          nationalSubjectCategoryName: {
            value:
              'Sociology (excluding Social work, Social Psychology and Social Anthropology)',
          },
          language: {
            value: 'en',
          },
        },
        subjectCode: {
          value: '50401',
        },
      },
    },
  },
];

export const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { optionSelect: 'option2' } });

  return (
    <Autocomplete
      control={methods.control}
      label='Label for test'
      name='name'
      showLabel
      searchLink='nationalSubjectCategory'
      placeholder='somePlaceholder'
      tooltip={{
        title: 'tooltipTitle',
        body: 'tooltipBody',
      }}
    />
  );
};

describe('<Autocomplete/>', () => {
  it('renders with default placeholder', () => {
    render(<DummyForm />);
    const inputElement = screen.getByPlaceholderText('somePlaceholder');
    expect(inputElement).toBeInTheDocument();
  });

  it.todo('displays options when typing in the input', async () => {
    render(<DummyForm />);

    const inputElement = screen.getByPlaceholderText('somePlaceholder');
    const user = userEvent.setup();
    await user.click(inputElement);
    await user.type(inputElement, '*');
    await waitFor(() => {
      const optionElements = screen.getAllByText('nationalSubjectCategory');
      expect(optionElements.length).toBe(2);
    });
  });

  it('displays no options when input does not match any options', async () => {
    render(<DummyForm />);
    const inputElement = screen.getByPlaceholderText('somePlaceholder');
    const user = userEvent.setup();
    await user.click(inputElement);

    const noOptions = screen.getByText('No options');
    expect(noOptions).toBeInTheDocument();

    expect(screen.queryByText('Option 1')).toBeNull();
    expect(screen.queryByText('Option 2')).toBeNull();
  });
});
