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
