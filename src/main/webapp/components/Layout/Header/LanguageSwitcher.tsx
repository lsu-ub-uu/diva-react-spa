/*
 * Copyright 2024 Uppsala University Library
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
 */

import { Form, useLoaderData, useSubmit } from '@remix-run/react';
import { loader } from '@/root';
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  NativeSelect,
  OutlinedInput,
  Select,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { locale } = useLoaderData<typeof loader>();
  const { t } = useTranslation();
  const submit = useSubmit();

  return (
    <Form
      method='post'
      onChange={(event) => submit(event.currentTarget)}
    >
      <NativeSelect
        name='language'
        defaultValue={locale}
        input={<OutlinedInput />}
        size='small'
        startAdornment={<LanguageIcon />}
        aria-label={t('divaClient_ChooseLanguageText')}
      >
        <option value='en'>English</option>
        <option value='sv'>Svenska</option>
      </NativeSelect>
    </Form>
  );
};
