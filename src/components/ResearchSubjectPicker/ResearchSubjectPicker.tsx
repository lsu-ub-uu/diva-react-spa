import React, { useEffect, useState } from 'react';
import { Alert, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  getAllResearchSubjects,
  researchSubjectSelector,
  researchSubjectSelectItemsSelector,
} from '../../features/researchSubject';
import { MultiAutoComplete } from '../Form/MultiAutoComplete/MultiAutoComplete';
import { Dialog } from '../Dialog/Dialog';

export const ResearchSubjectPicker = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const researchSubjectState = useAppSelector(researchSubjectSelector);
  const researchSubjectSelectItems = useAppSelector(
    researchSubjectSelectItemsSelector,
  );

  useEffect(() => {
    dispatch(getAllResearchSubjects());
  }, [dispatch]);

  if (researchSubjectState.isError)
    return <Alert severity='error'>{researchSubjectState.message}</Alert>;

  return (
    <div>
      <MultiAutoComplete
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
      </Dialog>
    </div>
  );
};
