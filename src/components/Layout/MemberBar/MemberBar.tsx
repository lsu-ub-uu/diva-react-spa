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

import React from 'react';
import { Box } from '@mui/material';

interface MemberBarProps {
  color: string;
  children: React.ReactNode;
}

export const MemberBar = (props: MemberBarProps) => {
  return (
    <Box
      position='static'
      sx={{
        py: 1,
        backgroundColor: props.color,
        display: 'flex',
        justifyContent: 'center',
        img: {
          height: '100%',
        },
      }}
    >
      <Box sx={{ maxHeight: 40 }}>{props.children}</Box>
    </Box>
  );
};
