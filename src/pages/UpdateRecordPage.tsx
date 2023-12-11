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

import React, { useEffect, useState } from 'react';
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
import { FormGenerator, useBackdrop } from '../components';
import { FormSchema } from '../components/FormGenerator/types';

export const UpdateRecordPage = () => {
  const { recordId } = useParams();
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        `/record/${coraSchema?.schema?.validationTypeId}/${coraRecord.record?.id}`,
        values,
      );
      notification(`Record was successfully updated!`, 'success');
    } catch (err: any) {
      setIsSubmitting(false);
      notification(`${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{coraRecord.record?.id ?? 'not found'} | DiVA</title>
      </Helmet>
      <div>
        <Stack spacing={2}>
          {coraSchema.schema && coraRecord.record && (
            <FormGenerator
              record={coraRecord.record}
              onSubmit={handleSubmit}
              onInvalid={() => notification(`Update Form is invalid`, 'error')}
              formSchema={coraSchema.schema as FormSchema}
            />
          )}
        </Stack>
      </div>
    </>
  );
};
