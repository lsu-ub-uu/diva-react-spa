import React, { useEffect, useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResearchSubjects,
  researchSubjectSelector,
  researchSubjectSelectItemsSelector,
} from '../../features/researchSubject';
import { loadResearchSubjectsAsync } from '../../features/researchSubject/researchSubjectService';
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
