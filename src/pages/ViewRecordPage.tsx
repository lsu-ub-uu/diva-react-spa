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
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
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

export const ViewRecordPage = () => {
  const { recordId } = useParams();
  const activeSection = useSectionScroller();
  const { setBackdrop } = useBackdrop();
  const coraRecord = useCoraRecordByTypeAndId('divaOutput', recordId);
  const coraSchema = useCoraFormSchemaByValidationType(
    coraRecord.record?.validationType,
    'view',
  );

  useEffect(() => {
    setBackdrop(coraRecord.isLoading);
  }, [coraRecord.isLoading, setBackdrop]);

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
              record={coraRecord.record}
              onSubmit={() => {}}
              onInvalid={() => {}}
              formSchema={coraSchema.schema as FormSchema}
            />
          )}
        </Stack>
      </div>
    </>
  );
};
