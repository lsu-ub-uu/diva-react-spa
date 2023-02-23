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
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TabsMenu } from '../components/TabsMenu/TabsMenu';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div>
      <Typography
        variant='h3'
        gutterBottom
      >
        {t('Welcome')}
      </Typography>
      <Divider>{t('Tabs')}</Divider>
      <TabsMenu />
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
            disableRipple
            variant='contained'
            component={RouterLink}
            to='/users'
            endIcon={<ArrowForwardIcon />}
          >
            List dummy users
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
