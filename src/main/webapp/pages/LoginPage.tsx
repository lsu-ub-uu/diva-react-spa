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
import { useCallback, useEffect, useState } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSnackbar, VariantType } from 'notistack';
import { FieldValues } from 'react-hook-form';
import { useBackdrop, FormGenerator, AsidePortal } from '@/components';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { FormSchema } from '@/components/FormGenerator/types';
import { loginPasswordAsync } from '@/features/auth/actions';
import { AppDispatch } from '@/app/store';
import { authStateSelector } from '@/features/auth/selectors';

export const LoginPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setBackdrop } = useBackdrop();
  const [isLoading] = useState(false);
  const [error] = useState<string | null>(null);
  const [presentationParam] = useSearchParams();
  const [schema, setSchema] = useState<null | FormSchema>(null);
  const [formIsDiry, setFormIsDirty] = useState(false);
  const authState = useAppSelector(authStateSelector);
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  const notification = useCallback(
    (message: string, variant: VariantType) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
    },
    [enqueueSnackbar],
  );

  useEffect(() => {
    setBackdrop(isLoading || isSubmitting);
  }, [isLoading, setBackdrop, isSubmitting]);

  useEffect(() => {
    if (authState.hasError && authState.userSession === null && formIsDiry) {
      notification(`Loggin error`, 'error');
    }
    if (authState.userSession !== null && formIsDiry) {
      notification(`Loggin success`, 'success');
      navigate(-1);
    }
  }, [formIsDiry, navigate, notification, authState]);

  useEffect(() => {
    const parsedPresentation = JSON.parse(
      presentationParam.get('presentation') as string,
    );
    setSchema(parsedPresentation);
    // setPresentationParam({});
  }, [presentationParam]);

  const handlePasswordSelection = async (values: FieldValues) => {
    setFormIsDirty(true);
    try {
      setIsSubmitting(true);
      dispatch(
        loginPasswordAsync(values, () => {
          setBackdrop(false);
        }),
      );
    } catch {
      setIsSubmitting(false);
      // navigate('');
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
        <title>{t('divaClient_loginPageText')} | DiVA</title>
      </Helmet>
      <AsidePortal>
        <p>loginPage</p>
      </AsidePortal>
      <div>
        <Stack spacing={2}>
          {schema !== null ? (
            <FormGenerator
              onSubmit={handlePasswordSelection}
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
