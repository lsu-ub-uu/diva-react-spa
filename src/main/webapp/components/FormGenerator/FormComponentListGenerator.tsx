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
import { FormComponentGenerator } from '@/components/FormGenerator/FormComponentGenerator';
import { addAttributesToName } from '@/components/FormGenerator/utils';

interface FormComponentListGeneratorProps {
  components: FormComponent[];
  childWithNameInDataArray: string[];
  parentPresentationStyle?: string;
  path?: string;
}

export const FormComponentListGenerator = ({
  components,
  childWithNameInDataArray,
  parentPresentationStyle,
  path = '',
}: FormComponentListGeneratorProps): (JSX.Element | null)[] => {
  return components.map((c, i) => (
    <FormComponentGenerator
      key={addAttributesToName(c, c.name)}
      component={c}
      idx={i}
      path={path}
      childWithNameInDataArray={childWithNameInDataArray}
      parentPresentationStyle={parentPresentationStyle}
    />
  ));
};
