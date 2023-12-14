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
import React, { useEffect, useState } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';
import { FieldValues } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  useBackdrop,
  FormGenerator,
  AsidePortal,
  NavigationPanel,
  NavigationPanelLink,
} from '../components';
import { useCoraFormSchemaByValidationType } from '../app/hooks';
import { FormSchema } from '../components/FormGenerator/types';

export const CreateRecordPage = () => {
  const { validationType } = useParams();
  const [activeSection, setActiveSection] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setBackdrop } = useBackdrop();
  const { error, isLoading, schema } = useCoraFormSchemaByValidationType(
    validationType,
    'create',
  );

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
    const debounce = (func: () => void, wait: number) => {
      // @ts-ignore
      let timeoutId;

      // eslint-disable-next-line func-names
      return function (this: any, ...args: unknown[]) {
        // @ts-ignore
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          // @ts-ignore
          func.apply(this, args);
        }, wait);
      };
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections =
        document.querySelectorAll<HTMLSpanElement>('span.anchorLink');

      sections.forEach((section) => {
        const sectionBottom = section.offsetHeight + section.offsetTop;
        if (
          scrollPosition >= section.offsetTop - 5 &&
          scrollPosition <= sectionBottom + 5
        ) {
          setActiveSection(section.id.replace('anchor_', ''));
        }
      });
    };

    window.addEventListener('scroll', debounce(handleScroll, 10));
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSubmit = async (values: FieldValues) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `/record/${schema?.validationTypeId}`,
        values,
      );
      notification(
        `Record was successfully created ${response.data.id}`,
        'success',
      );
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

  const linksFromFormSchema = (
    formSchema: FormSchema,
  ): NavigationPanelLink[] | undefined =>
    formSchema?.form.components
      ?.filter((c) => !['text', 'container'].includes(c.type))
      .map((c) => ({ name: c.name, label: c.label } as NavigationPanelLink));

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
      <div style={{ marginBottom: '1000px' }}>
        <Stack spacing={2}>
          <FormGenerator
            onSubmit={handleSubmit}
            onInvalid={() => notification(`Form is invalid`, 'error')}
            formSchema={schema as FormSchema}
          />
        </Stack>
      </div>
    </>
  );
};
