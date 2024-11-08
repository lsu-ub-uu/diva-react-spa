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

import { FormComponent } from '@/components/FormGenerator/types';
import { useFormContext } from 'react-hook-form';
import { checkIfComponentHasValue } from '@/components/FormGenerator/formGeneratorUtils/formGeneratorUtils';
import React from 'react';
import { Grid } from '@mui/material';
import { ControlledLinkedRecord } from '@/components/Controlled';

interface RecordLinkWithLinkedPresentationProps {
  reactKey: string;
  renderElementGridWrapper: boolean;
  component: FormComponent;
  name: string;
}

export const RecordLinkWithLinkedPresentation = ({
  reactKey,
  renderElementGridWrapper,
  component,
  name,
}: RecordLinkWithLinkedPresentationProps) => {
  const { getValues, control } = useFormContext();
  const hasValue = checkIfComponentHasValue(getValues, name);
  return (
    <React.Fragment key={`${reactKey}_${name}`}>
      {hasValue ? (
        <Grid
          key={reactKey}
          item
          xs={12}
          sm={renderElementGridWrapper ? component.gridColSpan : 12}
        >
          <ControlledLinkedRecord
            control={control}
            name={name}
            recordType={component.recordLinkType ?? ''}
            presentationRecordLinkId={component.presentationRecordLinkId ?? ''}
          />
        </Grid>
      ) : null}
    </React.Fragment>
  );
};