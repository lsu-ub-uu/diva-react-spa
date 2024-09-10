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

import { useEffect, useState } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';
import { FieldValues } from 'react-hook-form';
import {
  useCoraFormSchemaByValidationType,
  useCoraRecordByTypeAndId,
} from '../app/hooks';
import {
  AsidePortal,
  FormGenerator,
  NavigationPanel,
  useBackdrop,
  linksFromFormSchema,
  useSectionScroller,
} from '../components';
import { FormSchema } from '../components/FormGenerator/types';
import { removeEmpty } from '../utils/removeEmpty';

export const UpdateRecordPage = () => {
  const { recordId } = useParams();
  const activeSection = useSectionScroller();
  const { enqueueSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setBackdrop } = useBackdrop();
  const coraRecord = useCoraRecordByTypeAndId('divaOutput', recordId);
  const coraSchema = useCoraFormSchemaByValidationType(
    coraRecord.record?.validationType,
    'update',
  );

  useEffect(() => {
    setBackdrop(coraRecord.isLoading || isSubmitting);
  }, [coraRecord.isLoading, isSubmitting, setBackdrop]);

  if (coraRecord.isLoading)
    return (
      <Skeleton
        variant='rectangular'
        height={800}
      />
    );

  if (coraRecord.error)
    return <Alert severity='error'>{coraRecord.error}</Alert>;

  if (coraSchema.error)
    return <Alert severity='error'>{coraSchema.error}</Alert>;

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  const handleSubmit = async (values: FieldValues) => {
    try {
      setIsSubmitting(true);
      const { record } = coraRecord;
      const coraUpdates = record ? record.updated : [];
      const lastUpdate = coraUpdates[coraUpdates.length - 1];
      const createdAt = record ? record.createdAt : null;
      const createdBy = record ? record.createdBy : null;
      const created = { createdAt, createdBy };

      const payload = { lastUpdate, created, values };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        `/record/${coraSchema?.schema?.validationTypeId}/${coraRecord.record?.id}`,
        removeEmpty(payload),
      );
      notification(`Record was successfully updated!`, 'success');
    } catch (err: any) {
      setIsSubmitting(false);
      notification(`${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (coraSchema.isLoading)
    return (
      <Skeleton
        variant='rectangular'
        height={800}
      />
    );

  return (
    <>
      <Helmet>
        <title>{coraRecord.record?.id ?? 'not found'} | DiVA</title>
      </Helmet>
      <AsidePortal>
        <NavigationPanel
          links={
            coraSchema.schema
              ? linksFromFormSchema(coraSchema.schema) || []
              : []
          }
          activeLinkName={activeSection}
        />
      </AsidePortal>
      <div>
        <Stack spacing={2}>
          {coraSchema.schema && coraRecord.record && (
            <FormGenerator
              record={{
                id: 'divaOutput:1729757581842184',
                recordType: 'divaOutput',
                validationType: 'nationalSubjectCategory',
                createdAt: '2024-09-09T08:29:02.073117Z',
                createdBy: '161616',
                updated: [
                  {
                    updateAt: '2024-09-09T08:29:02.073117Z',
                    updatedBy: '161616',
                  },
                ],
                userRights: ['read', 'update', 'index', 'delete'],
                data: {
                  someRootNameInData: {
                    author_language_uwu: {
                      givenName: {
                        value: 'Egil',
                      },
                      familyName: {
                        value: 'Swenning',
                      },
                      _language: 'uwu',
                    },
                    author_language_nau: {
                      givenName: {
                        value: 'Daniel',
                      },
                      familyName: {
                        value: 'Flores',
                      },
                      _language: 'nau',
                    },
                  },
                },
              }}
              onSubmit={() => {}}
              formSchema={{
                validationTypeId: 'nationalSubjectCategory',
                form: {
                  mode: 'input',
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
                  showLabel: true,
                  components: [
                    {
                      name: 'recordInfo',
                      type: 'group',
                      mode: 'input',
                      tooltip: {
                        title:
                          'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
                        body: 'recordInfoNationalSubjectCategoryRecordTypeNewGroupDefText',
                      },
                      label:
                        'recordInfoNationalSubjectCategoryRecordTypeNewGroupText',
                      showLabel: false,
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 1,
                        repeatMax: 1,
                      },
                      presentationStyle: '',
                      childStyle: [''],
                      gridColSpan: 12,
                    },
                    {
                      name: 'author',
                      type: 'group',
                      mode: 'input',
                      tooltip: {
                        title: 'authorGroupText',
                        body: 'authorGroupDefText',
                      },
                      label: 'authorGroupText',
                      showLabel: true,
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 1,
                        repeatMax: 1,
                      },
                      attributes: [
                        {
                          name: 'language',
                          type: 'collectionVariable',
                          placeholder: 'initialEmptyValueText',
                          mode: 'input',
                          tooltip: {
                            title: 'languageCollectionVarText',
                            body: 'languageCollectionVarDefText',
                          },
                          label: 'languageCollectionVarText',
                          showLabel: true,
                          options: [
                            {
                              value: 'nau',
                              label: 'nauLangItemText',
                            },
                            {
                              value: 'uwu',
                              label: 'uwuLangItemText',
                            },
                          ],
                          finalValue: 'uwu',
                        },
                      ],
                      components: [
                        {
                          name: 'givenName',
                          type: 'textVariable',
                          mode: 'input',
                          inputType: 'input',
                          tooltip: {
                            title: 'givenNameTextVarText',
                            body: 'givenNameTextVarDefText',
                          },
                          label: 'givenNameTextVarText',
                          placeholder: 'givenNameTextVarText1',
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
                          mode: 'input',
                          inputType: 'input',
                          tooltip: {
                            title: 'familyNameTextVarText',
                            body: 'familyNameTextVarDefText',
                          },
                          label: 'familyNameTextVarText',
                          placeholder: 'familyNameTextVarText1',
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
                      ],
                      presentationStyle: '',
                      childStyle: [''],
                      gridColSpan: 12,
                    },
                    {
                      name: 'author',
                      type: 'group',
                      mode: 'input',
                      tooltip: {
                        title: 'authorGroupText',
                        body: 'authorGroupDefText',
                      },
                      label: 'authorGroupText',
                      showLabel: true,
                      repeat: {
                        minNumberOfRepeatingToShow: 1,
                        repeatMin: 1,
                        repeatMax: 1,
                      },
                      attributes: [
                        {
                          name: 'language',
                          type: 'collectionVariable',
                          placeholder: 'initialEmptyValueText',
                          mode: 'input',
                          tooltip: {
                            title: 'languageCollectionVarText',
                            body: 'languageCollectionVarDefText',
                          },
                          label: 'languageCollectionVarText',
                          showLabel: true,
                          options: [
                            {
                              value: 'nau',
                              label: 'nauLangItemText',
                            },
                            {
                              value: 'uwu',
                              label: 'uwuLangItemText',
                            },
                          ],
                          finalValue: 'nau',
                        },
                      ],
                      components: [
                        {
                          name: 'givenName',
                          type: 'textVariable',
                          mode: 'input',
                          inputType: 'input',
                          tooltip: {
                            title: 'givenNameTextVarText',
                            body: 'givenNameTextVarDefText',
                          },
                          label: 'givenNameTextVarText',
                          placeholder: 'givenNameTextVarText2',
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
                          mode: 'input',
                          inputType: 'input',
                          tooltip: {
                            title: 'familyNameTextVarText',
                            body: 'familyNameTextVarDefText',
                          },
                          label: 'familyNameTextVarText',
                          placeholder: 'familyNameTextVarText2',
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
              }}
            />
          )}
        </Stack>
      </div>
    </>
  );
};
