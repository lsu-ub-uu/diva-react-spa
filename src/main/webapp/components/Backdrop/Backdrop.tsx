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
import { Backdrop as MuiBackdrop, Box, Theme } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface BackdropProps {
  open: boolean;
}

export const Backdrop = (props: BackdropProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  return (
    <MuiBackdrop
      sx={{ color: '#000', zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <Box
        display='flex'
        width={200}
        height={200}
        bgcolor='white'
      >
        <Box m='auto'>
          <CircularProgress
            color='inherit'
            size={64}
          />
        </Box>
      </Box>
    </MuiBackdrop>
  );
};
