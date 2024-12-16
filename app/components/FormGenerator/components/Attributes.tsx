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

import { AttributeSelect } from '@/components/Controlled/AttributeSelect/AttributeSelect';
import { useTranslation } from 'react-i18next';
import type {
  FormComponentCollVar,
  FormComponentWithData,
} from '@/components/FormGenerator/types';
import { useRemixFormContext } from 'remix-hook-form';

interface AttributesProps {
  component: FormComponentWithData;
  path: string;
}

export const Attributes = ({ component, path }: AttributesProps) => {
  const { t } = useTranslation();

  const attributesToShow = getAttributesToShow(component);
  const methods = useRemixFormContext();

  return attributesToShow.map((attribute, index) => {
    return (
      <AttributeSelect
        key={`${attribute.name}_${index}`}
        name={`${path}._${attribute.name}`}
        label={attribute.label ?? ''}
        options={
          attribute.finalValue
            ? attribute.options
            : [
                {
                  value: '',
                  label: t(
                    attribute.placeholder ?? 'divaClient_optionNoneText',
                  ),
                },
                ...(attribute.options ?? []),
              ]
        }
        showLabel={attribute.showLabel}
        placeholder={attribute.placeholder}
        tooltip={attribute.tooltip}
        readonly={attribute.finalValue !== undefined}
        displayMode={attribute.mode}
        {...methods}
      />
    );
  });
};

const getAttributesToShow = (component: FormComponentCollVar) => {
  if (component.attributesToShow === 'selectable') {
    return (component.attributes ?? []).filter(
      (attribute) => attribute.finalValue === undefined,
    );
  }

  if (component.attributesToShow === 'none') {
    return [];
  }

  // attributesToShow === 'all'
  return component.attributes ?? [];
};
