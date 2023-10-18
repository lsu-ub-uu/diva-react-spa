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
 *     along with DiVA Client.  If not, see <http://www.gnu.org/licenses/>.
 */

import { ButtonGroup, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface ActionButtonGroupProps {
  moveUpButtonDisabled: boolean;
  moveUpButtonAction: () => void;
  moveDownButtonDisabled: boolean;
  moveDownButtonAction: () => void;
  deleteButtonDisabled: boolean;
  deleteButtonAction: () => void;
}

export const ActionButtonGroup = (
  props: ActionButtonGroupProps,
): JSX.Element => {
  return (
    <ButtonGroup
      size='small'
      orientation='horizontal'
      variant='text'
    >
      <IconButton
        size='small'
        aria-label='up'
        disabled={props.moveUpButtonDisabled}
        onClick={props.moveUpButtonAction}
      >
        <ArrowUpwardIcon />
      </IconButton>
      <IconButton
        size='small'
        aria-label='delete'
        disabled={props.deleteButtonDisabled}
        onClick={props.deleteButtonAction}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton
        size='small'
        aria-label='down'
        disabled={props.moveDownButtonDisabled}
        onClick={props.moveDownButtonAction}
      >
        <ArrowDownwardIcon />
      </IconButton>
    </ButtonGroup>
  );
};
