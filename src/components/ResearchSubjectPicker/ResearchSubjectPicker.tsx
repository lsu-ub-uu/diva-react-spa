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

import { useEffect, useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResearchSubjects,
  researchSubjectSelector,
  researchSubjectSelectItemsSelector,
} from '../../features/researchSubject';
import { MultiAutoComplete } from '../Form/MultiAutoComplete/MultiAutoComplete';
import { Dialog } from '../Dialog/Dialog';
import { researchSubjectTreeSelector } from '../../features/researchSubject/selectors';
import { RichTree } from '../RichTree/RichTree';

export const ResearchSubjectPicker = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const researchSubjectState = useAppSelector(researchSubjectSelector);
  const researchSubjectSelectItems = useAppSelector(
    researchSubjectSelectItemsSelector,
  );
  const researchSubjectTree = useAppSelector(researchSubjectTreeSelector);

  useEffect(() => {
    dispatch(getAllResearchSubjects());
  }, [dispatch]);

  if (researchSubjectState.isError)
    return <Alert severity='error'>{researchSubjectState.message}</Alert>;

  const handleSelected = (id: string) => {
    if (!selected.includes(id) && id !== 'root') {
      setSelected((prevState) => [...prevState, id]);
      setOpen(false);
    }
  };

  return (
    <div>
      <MultiAutoComplete
        values={selected}
        onChange={(itemsSelected) => setSelected(itemsSelected)}
        onBrowseButtonClicked={() => setOpen(true)}
        loading={researchSubjectState.isLoading}
        options={researchSubjectSelectItems}
      />
      <Dialog
        title='Select Research Subject'
        closeButton
        open={open}
        closeAction={() => setOpen(false)}
      >
        <Typography sx={{ mb: 2 }}>Lorem ipsum</Typography>
        <RichTree
          tree={researchSubjectTree}
          onSelected={handleSelected}
        />
      </Dialog>
    </div>
  );
};
