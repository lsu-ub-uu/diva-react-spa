import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import {
  Alert,
  Divider,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';

export const HomePage = () => {
  return (
    <div>
      <Divider>Buttons</Divider>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <Button
            variant='contained'
            endIcon={<ArrowForwardIcon />}
          >
            Contained Button with icon
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            variant='outlined'
            startIcon={<DeleteIcon />}
          >
            Outline Button with prefix icon
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button variant='outlined'>Outlined Button</Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button endIcon={<AddCircleOutlineIcon />}>
            Link action with icon
          </Button>
        </Grid>
      </Grid>
      <Divider>Info & helper buttons</Divider>
      <Stack
        direction='row'
        spacing={2}
      >
        <Tooltip
          title='content of tooltip help'
          arrow
        >
          <IconButton
            color='info'
            aria-label='more info'
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider>Message Alerts</Divider>
      <Stack spacing={2}>
        <Alert severity='error'>This is an error alert</Alert>
        <Alert severity='warning'>This is a warning alert</Alert>
        <Alert severity='info'>This is an info alert</Alert>
        <Alert severity='success'>This is a success alert</Alert>
      </Stack>
    </div>
  );
};
