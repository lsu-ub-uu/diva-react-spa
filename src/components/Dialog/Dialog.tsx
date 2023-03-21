import { useEffect, useState, ReactNode } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  Stack,
  Theme,
} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(4),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(4),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <MuiDialogTitle
      sx={{ m: 0, pl: 4 }}
      {...other}
    >
      {children}
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
    </MuiDialogTitle>
  );
};

interface DialogProps {
  open: boolean;
  title: ReactNode;
  children?: ReactNode;
  closeButton: boolean;
  closeAction?: () => void;
  actions?: ReactNode[];
}

export const Dialog = (props: DialogProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  const handleClose = () => {
    if (props.closeAction) props.closeAction();
    setOpen(false);
  };

  return (
    <StyledDialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <DialogTitle
        id='customized-dialog-title'
        onClose={handleClose}
      >
        {props.title}
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Stack
          direction='row'
          spacing={1}
        >
          {props.actions?.map((action) => action)}
          {props.closeButton && (
            <Button
              variant='contained'
              onClick={handleClose}
            >
              {t('common.close')}
            </Button>
          )}
        </Stack>
      </DialogActions>
    </StyledDialog>
  );
};
