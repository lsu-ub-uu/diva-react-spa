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

import { render, screen, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import React from 'react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { expect } from 'vitest';
import { ControlledAutocomplete } from '../ControlledAutocomplete';
import { CoraRecord } from '../../../../app/hooks';

/**
 * @vitest-environment jsdom
 */

const mockOptions: CoraRecord[] = [
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
    userRights: ['read', 'read_incoming_links', 'update', 'index'],
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
    presentation: {
      form: {
        name: 'nationalSubjectCategory',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'nationalSubjectCategoryGroupText',
          body: 'nationalSubjectCategoryGroupDefText',
        },
        label: 'nationalSubjectCategoryGroupText',
        showLabel: false,
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'name',
            type: 'group',
            mode: 'output',
            tooltip: {
              title: 'nationalSubjectCategoryNameGroupText',
              body: 'nationalSubjectCategoryNameGroupDefText',
            },
            label: 'nationalSubjectCategoryNameGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            components: [
              {
                name: 'nationalSubjectCategoryName',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'nationalSubjectCategoryNameTextVarText',
                  body: 'nationalSubjectCategoryNameTextVarDefText',
                },
                label: 'nationalSubjectCategoryNameTextVarText',
                showLabel: false,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'semicolonText',
            type: 'text',
            textStyle: 'h3TextStyle',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'spaceText',
            type: 'text',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'alternativeName',
            type: 'group',
            mode: 'output',
            tooltip: {
              title: 'nationalSubjectCategoryAlternativeNameGroupText',
              body: 'nationalSubjectCategoryAlternativeNameGroupDefText',
            },
            label: 'nationalSubjectCategoryAlternativeNameGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            components: [
              {
                name: 'nationalSubjectCategoryName',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'nationalSubjectCategoryNameTextVarText',
                  body: 'nationalSubjectCategoryNameTextVarDefText',
                },
                label: 'nationalSubjectCategoryNameTextVarText',
                showLabel: false,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'spaceText',
            type: 'text',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'firstHalfParenthesisText',
            type: 'text',
            textStyle: 'h3TextStyle',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'subjectCode',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'subjectCodeTextVarText',
              body: 'subjectCodeTextVarDefText',
            },
            label: 'subjectCodeTextVarText',
            showLabel: false,
            validation: {
              type: 'regex',
              pattern: '^[0-9-\\s]{1,100}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'secondHalfParenthesisText',
            type: 'text',
            textStyle: 'h3TextStyle',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            type: 'container',
            name: 'nationalSubjectCategoryParentOutputListSContainer',
            mode: 'output',
            components: [
              {
                name: 'returnText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'subjectParentListText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'colonText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'spaceText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'nationalSubjectCategoryParent',
                type: 'group',
                mode: 'output',
                tooltip: {
                  title: 'nationalSubjectCategoryParentGroupText',
                  body: 'nationalSubjectCategoryParentGroupDefText',
                },
                label: 'nationalSubjectCategoryParentGroupText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                components: [
                  {
                    name: 'nationalSubjectCategory',
                    type: 'recordLink',
                    mode: 'output',
                    tooltip: {
                      title: 'nationalSubjectCategoryLinkText',
                      body: 'nationalSubjectCategoryLinkDefText',
                    },
                    label: 'nationalSubjectCategoryLinkText',
                    showLabel: true,
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [''],
                    gridColSpan: 12,
                    recordLinkType: 'nationalSubjectCategory',
                    presentationRecordLinkId:
                      'nationalSubjectCategoryOutputPLink',
                  },
                ],
                presentationStyle: '',
                childStyle: ['compact'],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            containerType: 'surrounding',
            childStyle: [''],
            gridColSpan: 12,
          },
        ],
        presentationStyle: 'inline',
        childStyle: [''],
        gridColSpan: 12,
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
    userRights: ['read', 'update', 'index', 'delete'],
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
    presentation: {
      form: {
        name: 'nationalSubjectCategory',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'nationalSubjectCategoryGroupText',
          body: 'nationalSubjectCategoryGroupDefText',
        },
        label: 'nationalSubjectCategoryGroupText',
        showLabel: false,
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'name',
            type: 'group',
            mode: 'output',
            tooltip: {
              title: 'nationalSubjectCategoryNameGroupText',
              body: 'nationalSubjectCategoryNameGroupDefText',
            },
            label: 'nationalSubjectCategoryNameGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            components: [
              {
                name: 'nationalSubjectCategoryName',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'nationalSubjectCategoryNameTextVarText',
                  body: 'nationalSubjectCategoryNameTextVarDefText',
                },
                label: 'nationalSubjectCategoryNameTextVarText',
                showLabel: false,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'semicolonText',
            type: 'text',
            textStyle: 'h3TextStyle',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'spaceText',
            type: 'text',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'alternativeName',
            type: 'group',
            mode: 'output',
            tooltip: {
              title: 'nationalSubjectCategoryAlternativeNameGroupText',
              body: 'nationalSubjectCategoryAlternativeNameGroupDefText',
            },
            label: 'nationalSubjectCategoryAlternativeNameGroupText',
            showLabel: false,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            components: [
              {
                name: 'nationalSubjectCategoryName',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'nationalSubjectCategoryNameTextVarText',
                  body: 'nationalSubjectCategoryNameTextVarDefText',
                },
                label: 'nationalSubjectCategoryNameTextVarText',
                showLabel: false,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'spaceText',
            type: 'text',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'firstHalfParenthesisText',
            type: 'text',
            textStyle: 'h3TextStyle',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'subjectCode',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'subjectCodeTextVarText',
              body: 'subjectCodeTextVarDefText',
            },
            label: 'subjectCodeTextVarText',
            showLabel: false,
            validation: {
              type: 'regex',
              pattern: '^[0-9-\\s]{1,100}$',
            },
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            name: 'secondHalfParenthesisText',
            type: 'text',
            textStyle: 'h3TextStyle',
            childStyle: ['compact'],
            gridColSpan: 12,
          },
          {
            type: 'container',
            name: 'nationalSubjectCategoryParentOutputListSContainer',
            mode: 'output',
            components: [
              {
                name: 'returnText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'subjectParentListText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'colonText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'spaceText',
                type: 'text',
                childStyle: [''],
                gridColSpan: 12,
              },
              {
                name: 'nationalSubjectCategoryParent',
                type: 'group',
                mode: 'output',
                tooltip: {
                  title: 'nationalSubjectCategoryParentGroupText',
                  body: 'nationalSubjectCategoryParentGroupDefText',
                },
                label: 'nationalSubjectCategoryParentGroupText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                components: [
                  {
                    name: 'nationalSubjectCategory',
                    type: 'recordLink',
                    mode: 'output',
                    tooltip: {
                      title: 'nationalSubjectCategoryLinkText',
                      body: 'nationalSubjectCategoryLinkDefText',
                    },
                    label: 'nationalSubjectCategoryLinkText',
                    showLabel: true,
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [''],
                    gridColSpan: 12,
                    recordLinkType: 'nationalSubjectCategory',
                    presentationRecordLinkId:
                      'nationalSubjectCategoryOutputPLink',
                  },
                ],
                presentationStyle: '',
                childStyle: ['compact'],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            containerType: 'surrounding',
            childStyle: [''],
            gridColSpan: 12,
          },
        ],
        presentationStyle: 'inline',
        childStyle: [''],
        gridColSpan: 12,
      },
    },
  },
];

const softwareEngineeringOption = {
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
  userRights: ['read', 'read_incoming_links', 'update', 'index'],
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
  presentation: {
    form: {
      name: 'nationalSubjectCategory',
      type: 'group',
      mode: 'output',
      tooltip: {
        title: 'nationalSubjectCategoryGroupText',
        body: 'nationalSubjectCategoryGroupDefText',
      },
      label: 'nationalSubjectCategoryGroupText',
      showLabel: false,
      repeat: {
        repeatMin: 1,
        repeatMax: 1,
      },
      components: [
        {
          name: 'name',
          type: 'group',
          mode: 'output',
          tooltip: {
            title: 'nationalSubjectCategoryNameGroupText',
            body: 'nationalSubjectCategoryNameGroupDefText',
          },
          label: 'nationalSubjectCategoryNameGroupText',
          showLabel: false,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              name: 'nationalSubjectCategoryName',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'nationalSubjectCategoryNameTextVarText',
                body: 'nationalSubjectCategoryNameTextVarDefText',
              },
              label: 'nationalSubjectCategoryNameTextVarText',
              showLabel: false,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [''],
              gridColSpan: 12,
            },
          ],
          presentationStyle: '',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'semicolonText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'spaceText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'alternativeName',
          type: 'group',
          mode: 'output',
          tooltip: {
            title: 'nationalSubjectCategoryAlternativeNameGroupText',
            body: 'nationalSubjectCategoryAlternativeNameGroupDefText',
          },
          label: 'nationalSubjectCategoryAlternativeNameGroupText',
          showLabel: false,
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          components: [
            {
              name: 'nationalSubjectCategoryName',
              type: 'textVariable',
              mode: 'output',
              inputType: 'input',
              tooltip: {
                title: 'nationalSubjectCategoryNameTextVarText',
                body: 'nationalSubjectCategoryNameTextVarDefText',
              },
              label: 'nationalSubjectCategoryNameTextVarText',
              showLabel: false,
              validation: {
                type: 'regex',
                pattern: '.+',
              },
              repeat: {
                minNumberOfRepeatingToShow: 1,
                repeatMin: 1,
                repeatMax: 1,
              },
              childStyle: [''],
              gridColSpan: 12,
            },
          ],
          presentationStyle: '',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'spaceText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'firstHalfParenthesisText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'subjectCode',
          type: 'textVariable',
          mode: 'output',
          inputType: 'input',
          tooltip: {
            title: 'subjectCodeTextVarText',
            body: 'subjectCodeTextVarDefText',
          },
          label: 'subjectCodeTextVarText',
          showLabel: false,
          validation: {
            type: 'regex',
            pattern: '^[0-9-\\s]{1,100}$',
          },
          repeat: {
            minNumberOfRepeatingToShow: 1,
            repeatMin: 1,
            repeatMax: 1,
          },
          childStyle: ['compact'],
          gridColSpan: 12,
        },
        {
          name: 'secondHalfParenthesisText',
          type: 'text',
          childStyle: ['compact'],
          gridColSpan: 12,
        },
      ],
      presentationStyle: 'inline',
      childStyle: [''],
      gridColSpan: 12,
    },
  },
};

const DummyForm = (): JSX.Element => {
  const methods = useForm({ defaultValues: { optionSelect: 'option2' } });

  return (
    <ControlledAutocomplete
      control={methods.control}
      label='Label for test'
      name='name'
      showLabel
      recordType='nationalSubjectCategory'
      searchLink='nationalSubjectCategory'
      presentationRecordLinkId='nationalSubjectCategoryPLink'
      placeholder='somePlaceholder'
      tooltip={{
        title: 'tooltipTitle',
        body: 'tooltipBody',
      }}
    />
  );
};

describe('<Autocomplete/>', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    const listUrl: string = `/search/nationalSubjectCategory?searchTermValue=*`;
    mockAxios.onGet(listUrl).reply(200, mockOptions);
    const optionUrl =
      '/record/nationalSubjectCategory/nationalSubjectCategory:6325356888554468?presentationRecordLinkId=nationalSubjectCategoryPLink';
    mockAxios.onGet(optionUrl).reply(200, softwareEngineeringOption);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('renders with default placeholder', () => {
    render(<DummyForm />);
    const inputElement = screen.getByPlaceholderText('somePlaceholder');
    expect(inputElement).toBeInTheDocument();
  });

  it('displays no options when input does not match any options', async () => {
    render(<DummyForm />);

    const inputElement = screen.getByPlaceholderText('somePlaceholder');
    const user = userEvent.setup();
    await user.click(inputElement);

    const noOptions = screen.getByText('divaClient_NoOptionsText');
    expect(noOptions).toBeInTheDocument();

    expect(screen.queryByText('Option 1')).toBeNull();
  });

  it('displays options when typing in the input', async () => {
    const user = userEvent.setup();
    render(<DummyForm />);
    const inputElement = screen.getByRole('combobox');
    expect(inputElement).toBeVisible();
    await user.click(inputElement);
    await user.type(inputElement, '*');

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
  });

  it('displays presentation for picked option', async () => {
    const user = userEvent.setup();
    render(<DummyForm />);
    const inputElement = screen.getByRole('combobox');
    expect(inputElement).toBeVisible();

    await user.click(inputElement);
    await user.type(inputElement, '*');

    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();

    const softwareEngineering = screen.getByText('Software Engineering');
    await user.click(softwareEngineering);
    expect(listbox).not.toBeInTheDocument();

    await waitFor(() => {
      const engineering = screen.queryByText(/Programvaruteknik/i);
      expect(engineering).toBeInTheDocument();
    });
  });
});
