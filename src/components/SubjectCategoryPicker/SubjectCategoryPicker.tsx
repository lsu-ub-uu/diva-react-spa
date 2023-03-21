import * as React from 'react';
import { Dialog } from '../Dialog/Dialog';
import { Button, Stack } from '@mui/material';
import { RichTree } from '../RichTree/RichTree';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface SubjectCategoryPickerProps {
  onSelect?: () => void;
}

export const SubjectCategoryPicker = (
  props: SubjectCategoryPickerProps,
): JSX.Element => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        disableRipple
        variant='outlined'
        onClick={handleClickOpen}
      >
        Select national subject category
      </Button>
      <Dialog
        title='Select Subject Category'
        closeButton={true}
        open={open}
        closeAction={() => setOpen(false)}
      >
        <RichTree />
      </Dialog>
    </>
  );
};
