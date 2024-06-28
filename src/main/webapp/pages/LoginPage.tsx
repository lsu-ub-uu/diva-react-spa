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
import { useSearchParams } from 'react-router-dom';
import {
  useBackdrop,
  FormGenerator,
  AsidePortal,
  NavigationPanel,
  linksFromFormSchema,
  useSectionScroller,
} from '../components';
import { useCoraFormSchemaByValidationType } from '../app/hooks';
import { FormSchema } from '../components/FormGenerator/types';
import { removeEmpty } from '../utils/removeEmpty';
import { formDefForLoginUnitWithPassword } from '../__mocks__/data/formDef';

export const LoginPage = () => {
  // const { validationType } = useParams();
  const activeSection = useSectionScroller();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setBackdrop } = useBackdrop();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [presentationParam, setPresentationParam] = useSearchParams();
  const [schema, setSchema] = useState<null | FormSchema>(null);
  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  useEffect(() => {
    setBackdrop(isLoading || isSubmitting);
  }, [isLoading, setBackdrop, isSubmitting]);

  useEffect(() => {
    const parsedPresentation = JSON.parse(
      presentationParam.get('presentation') as string,
    );
    setSchema(parsedPresentation);
    // presentationParam.delete('presentation');
    setPresentationParam({});
  }, []);

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
        <title>{t('divaClient_loginPageText')} | DiVA</title>
      </Helmet>
      <AsidePortal>
        <p>loginPage</p>
      </AsidePortal>
      <div>
        <Stack spacing={2}>
          {schema !== null ? (
            <FormGenerator
              onSubmit={() => {}}
              // onSubmit={handleSubmit}
              onInvalid={() => {
                notification(`Form is invalid`, 'error');
              }}
              formSchema={schema as FormSchema}
            />
          ) : (
            <span />
          )}
        </Stack>
      </div>
    </>
  );
};
