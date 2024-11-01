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

import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FeedIcon from '@mui/icons-material/Feed';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CoraRecord } from '@/features/record/types';
import axios from 'axios';
import { useSnackbar, VariantType } from 'notistack';

interface RecordActionButtonProps {
  record: CoraRecord;
}

export const RecordActionButtons = ({ record }: RecordActionButtonProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const notification = (message: string, variant: VariantType) => {
    enqueueSnackbar(message, {
      variant,
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });
  };

  const deleteRecord = async () => {
    try {
      await axios.delete(`/record/${record.recordType}/${record.id}`);
      notification(`Record ${record.id} was successfully deleted `, 'success');
      window.location.reload();
    } catch (err: any) {
      console.log('err', err);
    }
  };

  const handleDeleteClick = () => {
    if (
      confirm(`Are you sure you want to delete record with id ${record.id}?`)
    ) {
      deleteRecord();
    }
  };

  return record.userRights?.map((userRight) => {
    switch (userRight) {
      case 'read':
        return (
          <IconButton
            key={`${record.id}_rab_${userRight}`}
            component={Link}
            to={`/view/${record.recordType}/${record.id}`}
          >
            <FeedIcon />
          </IconButton>
        );
      case 'update':
        return (
          <IconButton
            key={`${record.id}_rab_${userRight}`}
            component={Link}
            to={`/update/${record.recordType}/${record.id}`}
          >
            <EditIcon />
          </IconButton>
        );
      case 'delete':
        return (
          <IconButton
            key={`${record.id}_rab_${userRight}`}
            onClick={handleDeleteClick}
          >
            <DeleteForeverIcon />
          </IconButton>
        );
      default:
        return null;
    }
  });
};
