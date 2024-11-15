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

import { styled } from '@mui/material';

interface SnackbarProviderProps {
  maxSnack: number;
  children: React.ReactNode;
}

/*const StyledSnackbarProvider = styled(NotistackSnackbarProvider)(() => ({
  '&.notistack-MuiContent': {
    backgroundColor: '#efefef',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  '&.notistack-MuiContent-success': {
    svg: {
      color: 'rgb(56, 142, 60)',
      fill: 'rgb(56, 142, 60)',
    },
  },
  '&.notistack-MuiContent-error': {
    svg: {
      color: 'rgb(211, 47, 47)',
      fill: 'rgb(211, 47, 47)',
    },
  },
  '&.notistack-MuiContent-warning': {
    svg: {
      color: 'rgb(245, 124, 0)',
      fill: 'rgb(245, 124, 0)',
    },
  },
  '&.notistack-MuiContent-info': {
    svg: {
      color: 'rgb(2, 136, 209)',
      fill: 'rgb(2, 136, 209)',
    },
  },
}));
*/
export const SnackbarProvider = (props: SnackbarProviderProps) => {
  return props.children;
};
