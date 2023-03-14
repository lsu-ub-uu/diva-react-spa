import { Tooltip } from 'components/Tooltip/Tooltip';
import { IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface TooltipHelpButtonProps {
  title: string;
  body: string;
}

export const TooltipHelpButton = (props: TooltipHelpButtonProps) => {
  return (
    <Tooltip
      title={props.title}
      body={props.body}
    >
      <IconButton
        sx={{ p: 0 }}
        disableRipple
        color='info'
        aria-label='info'
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};
