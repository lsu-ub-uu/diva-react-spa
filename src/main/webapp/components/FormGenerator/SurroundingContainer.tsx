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
import React from 'react';
import { addAttributesToName } from '@/components/FormGenerator/utils';
import { checkIfPresentationStyleIsInline } from '@/components/FormGenerator/utils/helper';
import { FormComponentListGenerator } from '@/components/FormGenerator/FormComponentListGenerator';

interface SurroundingContainerProps {
  reactKey: string;
  component: FormComponent;
  currentComponentNamePath: string;
  parentPresentationStyle: string | undefined;
}

export const SurroundingContainer = ({
  reactKey,
  component,
  currentComponentNamePath,
  parentPresentationStyle,
}: SurroundingContainerProps) => {
  return (
    <React.Fragment key={reactKey}>
      <div
        id={`anchor_${addAttributesToName(component, component.name)}`}
        key={reactKey}
        style={{
          display: 'flex',
          flexDirection: checkIfPresentationStyleIsInline(component)
            ? 'row'
            : 'column',
          alignItems: checkIfPresentationStyleIsInline(component)
            ? 'center'
            : undefined,
        }}
      >
        {component.components && (
          <FormComponentListGenerator
            components={component.components}
            childWithNameInDataArray={[]}
            parentPresentationStyle={
              component.presentationStyle ?? parentPresentationStyle
            }
            path={currentComponentNamePath}
          />
        )}
      </div>
    </React.Fragment>
  );
};
