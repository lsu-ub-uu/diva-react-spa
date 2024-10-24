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

import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';
import { FieldValues } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useBackdrop,
  FormGenerator,
  AsidePortal,
  NavigationPanel,
  linksFromFormSchema,
  useSectionScroller,
} from '@/components';
import {
  useCoraFormSchemaByValidationType,
  useCoraRecordByType,
} from '@/app/hooks';
import { FormSchema } from '@/components/FormGenerator/types';
import { removeEmpty } from '@/utils/removeEmpty';
import { getRecordInfo, getValueFromRecordInfo } from '@/utils/getRecordInfo';

export const CreateRecordPage = () => {
  const { validationType } = useParams();
  const activeSection = useSectionScroller();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setBackdrop } = useBackdrop();
  const coraRecord = useCoraRecordByType(validationType);

  const { error, isLoading, schema } = useCoraFormSchemaByValidationType(
    validationType,
    'create',
  );
  const navigate = useNavigate();

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  useEffect(() => {
    setBackdrop(isLoading || isSubmitting);
  }, [isLoading, setBackdrop, isSubmitting]);

  const handleSubmit = async (values: FieldValues) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `/record/${schema?.validationTypeId}`,
        removeEmpty(values),
      );
      notification(
        `Record was successfully created ${response.data.id}`,
        'success',
      );
      const recordInfo = getRecordInfo(response.data);
      const id = getValueFromRecordInfo(recordInfo, 'id')[0].value;
      const recordType = getValueFromRecordInfo(recordInfo, 'type')[0].value;
      console.log(recordType);
      navigate(`/update/record/${recordType}/${id}`);
    } catch (err: any) {
      setIsSubmitting(false);
      notification(`${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return <Alert severity='error'>{error}</Alert>;
  if (isLoading)
    return (
      <Skeleton
        variant='rectangular'
        height={800}
      />
    );

  return (
    <>
      <Helmet>
        <title>{t(schema?.form.label as string)} | DiVA</title>
      </Helmet>
      <AsidePortal>
        <NavigationPanel
          links={schema ? linksFromFormSchema(schema) || [] : []}
          activeLinkName={activeSection}
        />
      </AsidePortal>
      <div>
        <Stack spacing={2}>
          <FormGenerator
            record={coraRecord.record}
            onSubmit={handleSubmit}
            onInvalid={() => {
              notification(`Form is invalid`, 'error');
            }}
            formSchema={schema as FormSchema}
          />
        </Stack>
      </div>
    </>
  );
};
