import { useState } from 'react';
import { Backdrop as MuiBackdrop, Box } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

export const Backdrop = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);

    /*
    if (typeof window !== 'undefined' && window.document) {
      document.body.style.overflow = 'hidden';
    }
    */
  };

  return (
    <div>
      <Button
        variant='contained'
        onClick={handleToggle}
      >
        spinner loader backdrop
      </Button>
      <MuiBackdrop
        sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
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
    </div>
  );
};
