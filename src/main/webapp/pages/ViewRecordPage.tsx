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

import { useEffect } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';

import {
  AsidePortal,
  linksFromFormSchema,
  NavigationPanel,
  useSectionScroller,
} from '@/components';
import { removeComponentsWithoutValuesFromSchema } from '@/components/NavigationPanel/utils';
import { CoraRecord } from '@/types/record';
import { RecordForm } from '@/components/Form/RecordForm';
import { RecordFormSchema } from '@/components/FormGenerator/types';

interface ViewRecordPageProps {
  record: CoraRecord;
  formDefinition: RecordFormSchema;
}

export const ViewRecordPage = ({
  record,
  formDefinition,
}: ViewRecordPageProps) => {
  const activeSection = useSectionScroller();

  return (
    <>
      {/*     <Helmet>
        <title>{coraRecord.record?.id ?? 'not found'} | DiVA</title>
      </Helmet>*/}
      <AsidePortal>
        <NavigationPanel
          links={
            formDefinition
              ? linksFromFormSchema(
                  removeComponentsWithoutValuesFromSchema(
                    formDefinition,
                    record,
                  ),
                ) || []
              : []
          }
          activeLinkName={activeSection}
        />
      </AsidePortal>
      <div>
        <Stack spacing={2}>
          <RecordForm
            record={record}
            formSchema={formDefinition}
          />
        </Stack>
      </div>
    </>
  );
};
