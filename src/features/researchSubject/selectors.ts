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
 */

import { RootState } from 'app/store';
import { SelectItem } from 'components';
import { getTree } from '../../utils';

export const researchSubjectSelectItemsSelector = (state: RootState) => {
  return state.researchSubject.researchSubjects
    .filter((i) => i.id !== 'root')
    .map(
      (item) =>
        ({
          id: item.id,
          name: `${item.name}`,
          disabled: item.disabled,
        } as SelectItem),
    );
};

export const researchSubjectTreeSelector = (state: RootState) => {
  const treeData = getTree(state.researchSubject.researchSubjects, '-');
  return treeData[0];
};

export const researchSubjectSelector = (state: RootState) => {
  return state.researchSubject;
};
