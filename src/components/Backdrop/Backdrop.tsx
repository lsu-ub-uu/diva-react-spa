import { useEffect, useState } from 'react';
import { Backdrop as MuiBackdrop, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface BackdropProps {
  open: boolean;
}

export const Backdrop = (props: BackdropProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  /*
  if (typeof window !== 'undefined' && window.document) {
    document.body.style.overflow = 'hidden';
  }
  */

  return (
    <MuiBackdrop
      sx={{ color: '#000', zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
