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

/**
 * @vitest-environment jsdom
 */

import {
  flattenObject,
  getLastKeyFromString,
  toShortString,
  removeComponentsWithoutValuesFromSchema,
} from '../utils';
import { formDefWithTwoTextVariableWithModeOutput } from '../../../__mocks__/data/formDef';
import { FormSchema } from '../../FormGenerator/types';
import {
  authorAndTitleSchema,
  authorRecord,
  coraRecord,
  coraRecord2,
  coraRecord3,
} from './mocks';

describe('removeComponentsWithoutValuesFromSchema', () => {
  it('returns someRootNameInData', () => {
    const actual = removeComponentsWithoutValuesFromSchema(
      formDefWithTwoTextVariableWithModeOutput as FormSchema,
      coraRecord,
    );
    expect(actual).toStrictEqual({
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        tooltip: {
          title: 'textId345',
          body: 'defTextId678',
        },
        components: [
          {
            name: 'someTextVar',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'someMetadataTextVarText',
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
        mode: 'output',
      },
    });
  });

  it('returns textVar', () => {
    const actual = removeComponentsWithoutValuesFromSchema(
      formDefWithTwoTextVariableWithModeOutput as FormSchema,
      coraRecord,
    );
    expect(actual).toStrictEqual({
      validationTypeId: 'someValidationTypeId',
      form: {
        type: 'group',
        label: 'someRootFormGroupText',
        name: 'someRootNameInData',
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        tooltip: {
          title: 'textId345',
          body: 'defTextId678',
        },
        components: [
          {
            name: 'someTextVar',
            type: 'textVariable',
            mode: 'output',
            inputType: 'input',
            tooltip: {
              title: 'exampleMetadataTextVarText',
              body: 'exampleMetadataTextVarDefText',
            },
            label: 'someMetadataTextVarText',
            validation: {
              type: 'regex',
              pattern: '.*',
            },
            repeat: {
              repeatMin: 1,
              repeatMax: 1,
            },
          },
        ],
        mode: 'output',
      },
    });
  });

  it('returns an author group', () => {
    const actual = removeComponentsWithoutValuesFromSchema(
      authorAndTitleSchema as FormSchema,
      authorRecord,
    );
    expect(actual).toStrictEqual({
      validationTypeId: 'preprint',
      form: {
        name: 'divaOutput',
        type: 'group',
        mode: 'output',
        tooltip: {
          title: 'divaOutputGroupText',
          body: 'divaOutputGroupDefText',
        },
        label: 'divaOutputGroupText',
        headlineLevel: 'h1',
        showLabel: true,
        repeat: {
          repeatMin: 1,
          repeatMax: 1,
        },
        components: [
          {
            name: 'author',
            type: 'group',
            mode: 'output',
            tooltip: {
              title: 'authorGroupText',
              body: 'authorGroupDefText',
            },
            label: 'authorGroupText',
            showLabel: true,
            repeat: {
              minNumberOfRepeatingToShow: 1,
              repeatMin: 0,
              repeatMax: 1.7976931348623157e308,
            },
            components: [
              {
                name: 'givenName',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'givenNameTextVarText',
                  body: 'givenNameTextVarDefText',
                },
                label: 'givenNameTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: ['sixChildStyle'],
                gridColSpan: 6,
              },
              {
                name: 'familyName',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'familyNameTextVarText',
                  body: 'familyNameTextVarDefText',
                },
                label: 'familyNameTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 1,
                  repeatMax: 1,
                },
                childStyle: ['sixChildStyle'],
                gridColSpan: 6,
              },
              {
                name: 'birthYear',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'birthYearTextVarText',
                  body: 'birthYearTextVarDefText',
                },
                label: 'birthYearTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '(^[0-9]{4,4}$)',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: ['sixChildStyle'],
                gridColSpan: 6,
              },
              {
                name: 'deathYear',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'deathYearTextVarText',
                  body: 'deathYearTextVarDefText',
                },
                label: 'deathYearTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '(^[0-9]{4,4}$)',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: ['sixChildStyle'],
                gridColSpan: 6,
              },
              {
                name: 'email',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'contributorEmailTextVarText',
                  body: 'contributorEmailTextVarDefText',
                },
                label: 'contributorEmailTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '^([\\w].*?@([\\w].*\\.\\w{2,4}))$',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: ['nineChildStyle'],
                gridColSpan: 9,
              },
              {
                name: 'correspondingAuthor',
                type: 'collectionVariable',
                placeholder: 'initialEmptyValueText',
                mode: 'output',
                tooltip: {
                  title: 'correspondingAuthorCollectionVarText',
                  body: 'correspondingAuthorCollectionVarDefText',
                },
                label: 'correspondingAuthorCollectionVarText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                options: [
                  {
                    value: 'true',
                    label: 'trueDivaItemText',
                  },
                ],
                childStyle: ['threeChildStyle'],
                gridColSpan: 3,
              },
              {
                name: 'localUserId',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'localUserIdTextVarText',
                  body: 'localUserIdTextVarDefText',
                },
                label: 'localUserIdTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: ['sixChildStyle'],
                gridColSpan: 6,
              },
              {
                name: 'orcid',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'orcidTextVarText',
                  body: 'orcidTextVarDefText',
                },
                label: 'orcidTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '^(\\d{4})-(\\d{4})-(\\d{4})-(\\d{3}[0-9X])$',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1,
                },
                childStyle: ['sixChildStyle'],
                gridColSpan: 6,
              },
              {
                name: 'otherOrganisation',
                type: 'group',
                mode: 'output',
                tooltip: {
                  title: 'otherOrganisationGroupText',
                  body: 'otherOrganisationGroupDefText',
                },
                label: 'otherOrganisationGroupText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                components: [
                  {
                    name: 'name',
                    type: 'textVariable',
                    mode: 'output',
                    inputType: 'input',
                    tooltip: {
                      title: 'nameTextVarText',
                      body: 'nameTextVarDefText',
                    },
                    label: 'nameTextVarText',
                    showLabel: true,
                    validation: {
                      type: 'regex',
                      pattern: '.+',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
                      repeatMax: 1,
                    },
                    childStyle: [''],
                    gridColSpan: 12,
                  },
                  {
                    name: 'rorId',
                    type: 'textVariable',
                    mode: 'output',
                    inputType: 'input',
                    tooltip: {
                      title: 'rorIdTextVarText',
                      body: 'rorIdTextVarDefText',
                    },
                    label: 'rorIdTextVarText',
                    showLabel: true,
                    validation: {
                      type: 'regex',
                      pattern:
                        '^(https://ror.org/0[a-hj-km-np-tv-z|0-9]{6}[0-9]{2})$',
                    },
                    repeat: {
                      minNumberOfRepeatingToShow: 1,
                      repeatMin: 0,
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
                name: 'researchGroup',
                type: 'recordLink',
                mode: 'output',
                tooltip: {
                  title: 'researchGroupLinkText',
                  body: 'researchGroupLinkDefText',
                },
                label: 'researchGroupLinkText',
                showLabel: true,
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
                childStyle: [''],
                gridColSpan: 12,
                recordLinkType: 'researchGroup',
                presentationRecordLinkId: 'researchGroupOutputPLink',
              },
              {
                name: 'otherResearchGroup',
                type: 'textVariable',
                mode: 'output',
                inputType: 'input',
                tooltip: {
                  title: 'otherResearchGroupTextVarText',
                  body: 'otherResearchGroupTextVarDefText',
                },
                label: 'otherResearchGroupTextVarText',
                showLabel: true,
                validation: {
                  type: 'regex',
                  pattern: '.+',
                },
                repeat: {
                  minNumberOfRepeatingToShow: 1,
                  repeatMin: 0,
                  repeatMax: 1.7976931348623157e308,
                },
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
    });
  });
});

describe('flattenObj', () => {
  it(' returns flattened object with one variable', () => {
    const actual = flattenObject(coraRecord.data);

    expect(actual).toStrictEqual({
      'someRootNameInData.someTextVar.value': 'someTestText',
    });
  });

  it(' returns flattened object with one variable with attribute', () => {
    const actual = flattenObject(coraRecord3.data);

    expect(actual).toStrictEqual({
      'divaOutput.title.mainTitle.value': 'asdasd',
      'divaOutput.title._language': 'akk',
    });
  });

  it(' returns flattened object with two variable', () => {
    const actual = flattenObject(coraRecord2.data);

    expect(actual).toStrictEqual({
      'someRootNameInData.someOtherTextVar.value': 'someOtherTestText',
      'someRootNameInData.someTextVar.value': 'someTestText',
    });
  });
});
describe('toShortString', () => {
  it(' returns toShortString for one variable', () => {
    const actual = toShortString({
      'someRootNameInData.someTextVar.value': 'someTestText',
    });

    expect(actual).toStrictEqual(['someRootNameInData.someTextVar']);
  });

  it(' returns toShortString for one variable with attribute', () => {
    const actual = toShortString({
      'divaOutput.title.mainTitle.value': 'asdasd',
      'divaOutput.title._language': 'akk',
    });

    expect(actual).toStrictEqual(['divaOutput.title']);
  });

  it(' returns toShortString for two variables', () => {
    const actual = toShortString({
      'someRootNameInData.someOtherTextVar.value': 'someOtherTestText',
      'someRootNameInData.someTextVar.value': 'someTestText',
    });

    expect(actual).toStrictEqual([
      'someRootNameInData.someOtherTextVar',
      'someRootNameInData.someTextVar',
    ]);
  });
});
describe('getLastKeyFromString', () => {
  it(' returns one getLastKeyFromString', () => {
    const actual = getLastKeyFromString(['someRootNameInData.someTextVar']);

    expect(actual).toStrictEqual(['someTextVar']);
  });

  it(' returns two getLastKeyFromString', () => {
    const actual = getLastKeyFromString([
      'someRootNameInData.someOtherTextVar',
      'someRootNameInData.someTextVar',
    ]);

    expect(actual).toStrictEqual(['someOtherTextVar', 'someTextVar']);
  });
});
