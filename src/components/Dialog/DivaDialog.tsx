import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4),
  },
}));

export interface DivaDialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const DivaDialogTitle = (props: DivaDialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, pl: 4 }}
      {...other}
    >
      <Typography
        variant='h6'
        sx={{ fontWeight: 700 }}
      >
        {children}
      </Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme: Theme) => theme.palette.info.main,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const DivaDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant='outlined'
        onClick={handleClickOpen}
      >
        Open test dialog
      </Button>
      <StyledDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <DivaDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          Modal title goes here
        </DivaDialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            autoFocus
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};
