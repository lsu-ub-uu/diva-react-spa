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

import { removeEmpty } from '../removeEmpty';
import { cleanFormData } from '@/utils/cleanFormData';
import { RecordFormSchema } from '@/components/FormGenerator/types';

describe('removeEmpty', () => {
  const data = {
    prop1: 'hello',
    prop2: undefined,
    prop3: null,
    prop4: {
      innerProp: undefined,
      innerProp2: 'world',
    },
    prop5: [],
    prop6: ['a'],
    prop7: '',
  };

  const cleaned = {
    prop1: 'hello',
    prop4: {
      innerProp2: 'world',
    },
    prop5: [],
    prop6: ['a'],
    prop7: '',
  };

  it('should return a data object with properties removed if null or undefined', () => {
    expect(removeEmpty(data)).toStrictEqual(cleaned);
  });
});

describe('cleanFormData', () => {
  it('removes optional group if it contains no valuable data', () => {
    const formData = {
      output: {
        someMandatoryVar: {
          value: 'hej',
        },
        originInfo: [
          {
            agent: [
              {
                role: {
                  roleTerm: {
                    value: 'pbl',
                    finalValue: true,
                  },
                },
              },
            ],
            dateIssued: {
              year: {
                value: null,
              },
            },
          },
        ],
      },
    };

    const expected = {
      output: {
        someMandatoryVar: { value: 'hej' },
      },
    };

    expect(cleanFormData(formData, formSchema)).toEqual(expected);
  });
});

const formSchema: RecordFormSchema = {
  validationTypeId: 'diva-output',
  form: {
    name: 'output',
    type: 'group',
    mode: 'input',
    tooltip: {
      title: 'outputNewGroupText',
      body: 'outputNewGroupDefText',
    },
    label: 'outputNewGroupText',
    showLabel: true,
    repeat: {
      repeatMin: 1,
      repeatMax: 1,
    },
    components: [
      {
        name: 'someMandatoryVar',
        type: 'textVariable',
        mode: 'input',
        inputType: 'input',
        tooltip: {
          title: 'yearTextVarText',
          body: 'yearTextVarDefText',
        },
        label: 'yearTextVarText',
        showLabel: true,
        validation: {
          type: 'regex',
          pattern: '(^[0-9]{4,4}$)',
        },
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 1,
          repeatMax: 1,
        },
        childStyle: [''],
        gridColSpan: 12,
      },
      {
        name: 'originInfo',
        type: 'group',
        mode: 'input',
        tooltip: {
          title: 'originInfoGroupText',
          body: 'originInfoGroupDefText',
        },
        label: 'originInfoGroupText',
        showLabel: true,
        repeat: {
          minNumberOfRepeatingToShow: 1,
          repeatMin: 0,
          repeatMax: 1,
        },
        components: [
          {
            name: 'dateIssued',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'dateIssuedGroupText',
              body: 'dateIssuedGroupDefText',
            },
            label: 'dateIssuedGroupText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 1,
              repeatMax: 1,
            },
            components: [
              {
                name: 'year',
                type: 'textVariable',
                mode: 'input',
                inputType: 'input',
                tooltip: {
                  title: 'yearTextVarText',
                  body: 'yearTextVarDefText',
                },
                label: 'yearTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '(^[0-9]{4,4}$)',
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
            childStyle: [''],
            gridColSpan: 12,
          },
          {
            name: 'agent',
            type: 'group',
            mode: 'input',
            tooltip: {
              title: 'agentGroupText',
              body: 'agentGroupDefText',
            },
            label: 'agentGroupText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1,
            },
            components: [
              {
                name: 'role',
                type: 'group',
                mode: 'input',
                tooltip: {
                  title: 'rolePublisherGroupText',
                  body: 'rolePublisherGroupDefText',
                },
                label: 'rolePublisherGroupText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                components: [
                  {
                    name: 'roleTerm',
                    type: 'collectionVariable',
                    placeholder: 'initialEmptyValueText',
                    mode: 'input',
                    tooltip: {
                      title: 'roleCollectionVarText',
                      body: 'roleCollectionVarDefText',
                    },
                    label: 'roleCollectionVarText',
                    showLabel: true,
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 1,
                      repeatMax: 1,
                    },
                    options: [
                      {
                        value: 'aut',
                        label: 'autItemText',
                      },
                    ],
                    finalValue: 'aut',
                    childStyle: [''],
                    gridColSpan: 12,
                  },
                ],
                presentationStyle: '',
                childStyle: [''],
                gridColSpan: 12,
              },
            ],
            presentationStyle: '',
            childStyle: [''],
            gridColSpan: 12,
          },
        ],
        presentationStyle: '',
        childStyle: [''],
        gridColSpan: 12,
      },
    ],
    presentationStyle: '',
    childStyle: [''],
    gridColSpan: 12,
  },
};
