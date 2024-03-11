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

import {
  Alert,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteIcon from '@mui/icons-material/Delete';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import { ControlledAutocomplete } from '../Autocomplete/ControlledAutocomplete';
import { RichTree } from '../RichTree/RichTree';
import { Dialog } from '../Dialog/Dialog';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  subjectCategorySelector,
  getSubjectCategoryDetails,
  subjectCategorySelectItemsSelector,
  getAllSubjectCategories,
} from '../../features/subjectCategory';
import subjectCategories from '../../__mocks__/data/subjectCategories.json';

interface SubjectCategoryPickerProps {
  onSelect?: (id: string) => void;
}

export const SubjectCategoryPicker = (
  props: SubjectCategoryPickerProps,
): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const subjectCategoryState = useAppSelector(subjectCategorySelector);
  const subjectCategoriesWithId = useAppSelector(
    subjectCategorySelectItemsSelector,
  );
  const subjectCategoriesWithNames = useAppSelector(
    getSubjectCategoryDetails(selected),
  );

  useEffect(() => {
    dispatch(getAllSubjectCategories());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSelected = (id: string) => {
    if (!selected.includes(id) && id !== 'root') {
      if (props.onSelect) props.onSelect(id);
      setSelected((prevState) => [...prevState, id]);
      setOpen(false);
    }
  };

  const remove = (removeId: string) => {
    setSelected((prevState) => prevState.filter((id) => id !== removeId));
  };

  if (subjectCategoryState.isLoading) return <span>Loading...</span>;
  if (subjectCategoryState.isError)
    return <Alert severity='error'>{subjectCategoryState.message}</Alert>;

  return (
    <Stack spacing={2}>
      <List dense>
        {selected.length === 0 && (
          <ListItem key='no-records'>
            <ListItemText
              primary='Add subject category'
              secondary='this is secondary text to help the user further'
            />
          </ListItem>
        )}
        {subjectCategoriesWithNames.map((subjectCategory, index) => (
          <ListItem
            key={`${subjectCategory.id}-${index}`}
            secondaryAction={
              <IconButton
                edge='end'
                aria-label='delete'
                onClick={() => remove(subjectCategory.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={`${subjectCategory.name} (kod ${subjectCategory.id})`}
            />
          </ListItem>
        ))}
      </List>
      <Button
        disableRipple
        variant='outlined'
        onClick={handleClickOpen}
        endIcon={<ControlPointIcon />}
      >
        {t('Add national subject category')}
      </Button>
      <Dialog
        title={t('Select national subject category')}
        closeButton
        open={open}
        fixedHeader={
          <ControlledAutocomplete
            placeholder='Sök ämneskategori'
            name=''
            label=''
            // options={subjectCategoriesWithId}
            onSelected={handleSelected}
          />
        }
        closeAction={() => setOpen(false)}
      >
        <Typography sx={{ mb: 2 }}>
          Välj nationell ämneskategori genom att klicka på namnet. Överordnad
          kategori följer automatiskt med. Bläddra i listan genom att klicka på
          pilarna.
        </Typography>
        <RichTree
          tree={subjectCategories} /* still hardcoded from local json file */
          onSelected={handleSelected}
        />
      </Dialog>
    </Stack>
  );
};
