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
import {
  AsidePortal,
  linksFromFormSchema,
  NavigationPanel,
  useSectionScroller,
} from '@/components';
import { removeEmpty } from '@/utils/removeEmpty';
import { RecordForm } from '@/components/Form/RecordForm';
import { CoraRecord } from '@/features/record/types';
import { RecordFormSchema } from '@/components/FormGenerator/types';

interface UpdateRecordPageProps {
  record: CoraRecord;
  formDefinition: RecordFormSchema;
}

export const UpdateRecordPage = ({
  record,
  formDefinition,
}: UpdateRecordPageProps) => {
  const activeSection = useSectionScroller();
  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  const handleSubmit = async (values: FieldValues) => {
    try {
      const payload = { values };
      await axios.post(
        `/record/${formDefinition?.validationTypeId}/${record?.id}`,
        removeEmpty(payload),
      );
      notification(`Record was successfully updated!`, 'success');
    } catch (err: any) {
      notification(`${err.message}`, 'error');
    }
  };

  return (
    <>
      {/*<Helmet>
        <title>{coraRecord.record?.id ?? 'not found'} | DiVA</title>
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
          <RecordForm
            record={record}
            onSubmit={handleSubmit}
            onInvalid={() => notification(`Update Form is invalid`, 'error')}
            formSchema={formDefinition}
          />
        </Stack>
      </div>
    </>
  );
};
