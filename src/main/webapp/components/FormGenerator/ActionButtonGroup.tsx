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

import { ButtonGroup, IconButton, Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useTranslation } from 'react-i18next';

interface ActionButtonGroupProps {
  entityName?: string;
  hideMoveButtons: boolean;
  moveUpButtonDisabled: boolean;
  moveUpButtonAction: () => void;
  moveDownButtonDisabled: boolean;
  moveDownButtonAction: () => void;
  deleteButtonDisabled: boolean;
  deleteButtonAction: () => void;
  entityType: string;
}

export const ActionButtonGroup = (
  props: ActionButtonGroupProps,
): JSX.Element => {
  const { t } = useTranslation();
  return (
    <ButtonGroup
      size='small'
      sx={{
        marginTop: isComponentGroupAndSingularForStyling(
          props.entityType,
          props.hideMoveButtons,
        )
          ? '-46px'
          : null,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        border: ' solid 1px',
        borderRadius: '25px',
        backgroundColor: '#00000',
      }}
      orientation='horizontal'
      variant='text'
    >
      {!props.hideMoveButtons && (
        <IconButton
          size='small'
          sx={{
            '&:hover': {
              backgroundColor: '#000000',
              '& .MuiSvgIcon-root': {
                color: '#ffffff',
                backgroundColor: '#000000',
              },
            },
          }}
          aria-label='up'
          disabled={props.moveUpButtonDisabled}
          onClick={props.moveUpButtonAction}
        >
          <ArrowUpwardIcon
            sx={{ color: props.moveUpButtonDisabled ? '#cccccc' : '#000000' }}
          />
        </IconButton>
      )}
      <Tooltip
        title={`${t('divaClient_removeFieldText')} ${
          props.entityName ?? 'entity'
        }`}
      >
        <span>
          <IconButton
            size='small'
            sx={{
              '&:hover': {
                backgroundColor: '#000000',
                '& .MuiSvgIcon-root': {
                  color: '#ffffff',
                  backgroundColor: '#000000',
                },
              },
            }}
            aria-label='delete'
            disabled={props.deleteButtonDisabled}
            onClick={props.deleteButtonAction}
          >
            <ClearIcon
              sx={{ color: props.deleteButtonDisabled ? '#cccccc' : '#000000' }}
            />
          </IconButton>
        </span>
      </Tooltip>
      {!props.hideMoveButtons && (
        <IconButton
          size='small'
          sx={{
            '&:hover': {
              backgroundColor: '#000000',
              '& .MuiSvgIcon-root': {
                color: '#ffffff',
                backgroundColor: '#000000',
              },
            },
          }}
          aria-label='down'
          disabled={props.moveDownButtonDisabled}
          onClick={props.moveDownButtonAction}
        >
          <ArrowDownwardIcon
            sx={{ color: props.moveDownButtonDisabled ? '#cccccc' : '#000000' }}
          />
        </IconButton>
      )}
    </ButtonGroup>
  );
};

export const isComponentGroupAndSingularForStyling = (
  entityType: string,
  hideMoveButtons: boolean,
) => {
  return entityType === 'group' && hideMoveButtons;
};
