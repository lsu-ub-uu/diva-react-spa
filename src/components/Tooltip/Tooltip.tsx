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
import React, { useState } from 'react';
import InfoIcon from '@mui/icons-material/Info';
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: 'rgba(0, 0, 0, 1)',
    minhHeight: 200,
    minWidth: 200,
    maxWidth: 400,
    fontSize: 16,
    border: '2px solid #2988D1',
    borderRadius: 8,
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

interface CustomTooltipProps {
  title: string;
  body: string;
}

interface ContentProps extends CustomTooltipProps {
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
      <Typography
        variant='h6'
        sx={{ fontWeight: 700 }}
      >
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

export const Tooltip = (props: CustomTooltipProps) => {
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
          <IconButton
            color='info'
            aria-label='todo aria label'
            onClick={handleTooltipToggle}
          >
            <InfoIcon />
          </IconButton>
        </StyledTooltip>
      </div>
    </ClickAwayListener>
  );
};
