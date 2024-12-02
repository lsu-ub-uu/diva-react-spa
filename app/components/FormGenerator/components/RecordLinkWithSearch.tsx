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

import { FormComponentRecordLink } from '@/components/FormGenerator/types';
import { Grid } from '@mui/material';
import { addAttributesToName } from '@/components/FormGenerator/defaultValues/defaultValues';
import { ControlledAutocomplete } from '@/components';
import { useRemixFormContext } from 'remix-hook-form';

interface RecordLinkWithSearchProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponentRecordLink;
  name: string;
}

export const RecordLinkWithSearch = ({
  reactKey,
  renderElementGridWrapper,
  component,
  name,
}: RecordLinkWithSearchProps) => {
  const { control } = useRemixFormContext();
  return (
    <Grid
      key={reactKey}
      item
      xs={12}
      id={`anchor_${addAttributesToName(component, component.name)}`}
      sm={renderElementGridWrapper ? component.gridColSpan : 12}
    >
      <ControlledAutocomplete
        label={component.label ?? ''}
        name={name}
        showLabel={component.showLabel}
        placeholder={component.placeholder}
        tooltip={component.tooltip}
        control={control}
        readOnly={!!component.finalValue}
        displayMode={component.mode}
        searchLink={component.search}
        presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
        recordType={component.recordLinkType ?? ''}
      />
    </Grid>
  );
};
