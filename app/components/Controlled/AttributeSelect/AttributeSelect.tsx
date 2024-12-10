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

import { Option } from '@/components';
import { useTranslation } from 'react-i18next';
import styles from './AttributeSelect.module.css';
import { useRemixFormContext } from 'remix-hook-form';
import { ErrorMessage } from '@hookform/error-message';

interface AttributeSelectProps {
  name: string;
  label: string;
  options: Option[] | undefined;
}

export const AttributeSelect = ({
  name,
  label,
  options = [],
}: AttributeSelectProps) => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useRemixFormContext();

  return (
    <label className={styles.attributeSelect}>
      {t(label)}:
      <select {...register(name)}>
        <option value=''>{t('divaClient_optionNoneText')}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {t(option.label)}
          </option>
        ))}
      </select>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => <p style={{ color: 'red' }}>{message}</p>}
      />
    </label>
  );
};
