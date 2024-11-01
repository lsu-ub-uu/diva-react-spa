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

import { Stack } from '@mui/material';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from '@remix-run/react';
import {
  AsidePortal,
  FormGenerator,
  linksFromFormSchema,
  NavigationPanel,
  useSectionScroller,
} from '../components';
import { FormSchema } from '../components/FormGenerator/types';
import { removeEmpty } from '../utils/removeEmpty';
import { getRecordInfo, getValueFromRecordInfo } from '../utils/getRecordInfo';
import { CoraRecord } from '@/webapp/app/hooks';

interface CreateRecordPageProps {
  record: CoraRecord;
  formDefinition: FormSchema;
}

export default function CreateRecordPage({
  record,
  formDefinition,
}: CreateRecordPageProps) {
  const activeSection = useSectionScroller();
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  const handleSubmit = async (values: FieldValues) => {
    try {
      const response = await axios.post(
        `/record/${formDefinition?.validationTypeId}`,
        removeEmpty(values),
      );
      notification(
        `Record was successfully created ${response.data.id}`,
        'success',
      );
      const recordInfo = getRecordInfo(response.data);
      const id = getValueFromRecordInfo(recordInfo, 'id')[0].value;
      const recordType = getValueFromRecordInfo(recordInfo, 'type')[0].value;
      navigate(`/update/${recordType}/${id}`);
    } catch (err: any) {
      notification(`${err.message}`, 'error');
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>{t(schema?.form.label as string)} | DiVA</title>
      </Helmet>*/}
      <AsidePortal>
        <NavigationPanel
          links={
            formDefinition ? linksFromFormSchema(formDefinition) || [] : []
          }
          activeLinkName={activeSection}
        />
      </AsidePortal>
      <div>
        <Stack spacing={2}>
          <FormGenerator
            record={record}
            onSubmit={handleSubmit}
            onInvalid={() => {
              notification(`Form is invalid`, 'error');
            }}
            formSchema={formDefinition}
          />
        </Stack>
      </div>
    </>
  );
}
