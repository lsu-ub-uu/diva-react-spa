import styled from '@emotion/styled';
import {
  Box,
  ClickAwayListener,
  IconButton,
  Theme,
  Tooltip as MuiTooltip,
  tooltipClasses,
  TooltipProps as MuiTooltipProps,
  Typography,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const StyledTooltip = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip
    arrow
    {...props}
    classes={{ popper: className }}
  />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 1)',
    minhHeight: 200,
    minWidth: 300,
    maxWidth: 600,
    fontSize: 16,
    border: '2px solid #2988D1',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.4)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    '&:before': {
      border: '2px solid #2988D1',
      backgroundColor: '#fff',
    },
    fontSize: 32,
    color: '#2988D1',
  },
}));

interface TooltipProps {
  title: string;
  body: string;
  children: ReactElement;
}

interface ContentProps {
  title: string;
  body: string;
  onClose: () => void;
}

const Content = (props: ContentProps) => {
  return (
    <Box>
      <IconButton
        aria-label='close'
        onClick={props.onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme: Theme) => theme.palette.info.main,
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography sx={{ fontWeight: 'bold', width: '90%' }}>
        {props.title}
      </Typography>
      <Typography
        variant='body1'
        sx={{ fontSize: 14 }}
      >
        {props.body}
      </Typography>
    </Box>
  );
};

export const Tooltip = (props: TooltipProps) => {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipToggle = () => {
    setOpen(!open);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <div>
        <StyledTooltip
          placement='top'
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          onClick={handleTooltipToggle}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={
            <Content
              {...props}
              onClose={handleTooltipClose}
            />
          }
        >
          {props.children}
        </StyledTooltip>
      </div>
    </ClickAwayListener>
  );
};
