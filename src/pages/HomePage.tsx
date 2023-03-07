import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  Alert,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  Step,
  StepLabel,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TabsMenu } from '../components/TabsMenu/TabsMenu';
import { AsidePortal, Card, Dialog, Tooltip, useBackdrop } from '../components';
import {
  HorizontalStepper,
  StepIcon,
} from '../components/HorizontalStepper/HorizontalStepper';
import { FileUpload } from '../components/FileUpload/FileUpload';

export const HomePage = () => {
  const { t } = useTranslation();
  const { setBackdrop } = useBackdrop();

  return (
    <div>
      <AsidePortal>
        <p>
          this is the homepage show some messages here perhaps - this was sent
          via the AsidePortal component
        </p>
      </AsidePortal>
      <Typography
        variant='h3'
        gutterBottom
      >
        {t('Welcome')}
      </Typography>
      <Divider>{t('Tabs')}</Divider>
      <TabsMenu />
      <Divider>{t('Steppers')}</Divider>
      <HorizontalStepper activeStep={1}>
        <Step key='Fyll i uppgifter'>
          <StepLabel StepIconComponent={StepIcon}>Fyll i uppgifter</StepLabel>
        </Step>
        <Step key='Ladda upp filer'>
          <StepLabel StepIconComponent={StepIcon}>Ladda upp filer</StepLabel>
        </Step>
        <Step key='Granska & publicera'>
          <StepLabel StepIconComponent={StepIcon}>
            Granska & publicera
          </StepLabel>
        </Step>
      </HorizontalStepper>
      <Divider>File uploader</Divider>
      <FileUpload />
      <Divider>Buttons</Divider>
      <Grid
        container
        spacing={3}
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
            List persons
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            disableRipple
            variant='outlined'
            startIcon={<ContentCopyIcon />}
          >
            Outline Button with prefix icon
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            disableRipple
            variant='outlined'
            endIcon={<PersonAddIcon />}
          >
            Fetch user data
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            disableRipple
            variant='outlined'
          >
            Outlined Button
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Button
            disableRipple
            endIcon={<AddCircleOutlineIcon />}
          >
            Link with icon at the end
          </Button>
        </Grid>
      </Grid>
      <Divider>Info & helper buttons</Divider>
      <Stack
        direction='row'
        spacing={2}
      >
        <Tooltip
          title='A title for the tooltip'
          body='Content of tooltip help Content help content of this component'
        >
          <IconButton
            disableRipple
            color='info'
            aria-label='info'
          >
            <InfoIcon />
          </IconButton>
        </Tooltip>
      </Stack>
      <Divider>Cards</Divider>
      <Card
        title='Publications and other stuff'
        variant='variant1'
        tooltipTitle='Publications help'
        tooltipBody='Publications help body text tooltip'
      >
        Lorem ipsum dolor sit amet
      </Card>
      <Divider>Message Alerts</Divider>
      <Stack spacing={2}>
        <Dialog
          closeButton
          open={false}
          title='Test dialog title'
          actions={[
            <Button
              to='/users'
              component={RouterLink}
              variant='outlined'
              key='test-button'
              endIcon={<ArrowForwardIcon />}
            >
              Goto homepage
            </Button>,
          ]}
        >
          this is the content
        </Dialog>
        <Button
          onClick={() => {
            setBackdrop(true);
            setTimeout(() => {
              setBackdrop(false);
            }, 5000);
          }}
          variant='outlined'
        >
          Show backdrop for 5 seconds
        </Button>
        <Alert severity='error'>This is an error alert</Alert>
        <Alert severity='warning'>This is a warning alert</Alert>
        <Alert severity='info'>This is an info alert</Alert>
        <Alert severity='success'>This is a success alert</Alert>
      </Stack>
      <Divider>Typography - (Helvetica)</Divider>
      <Stack spacing={2}>
        <Typography
          variant='h2'
          gutterBottom
        >
          h2. Heading
        </Typography>
        <Typography
          variant='h3'
          gutterBottom
        >
          h3. Heading
        </Typography>
        <Typography
          variant='h4'
          gutterBottom
        >
          h4. Heading
        </Typography>
        <Typography
          variant='h5'
          gutterBottom
        >
          h5. Heading
        </Typography>
        <Typography
          variant='h6'
          gutterBottom
        >
          h6. Heading
        </Typography>
        <Typography
          variant='subtitle1'
          gutterBottom
        >
          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography
          variant='subtitle2'
          gutterBottom
        >
          subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur
        </Typography>
        <Typography
          variant='body1'
          gutterBottom
        >
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography
          variant='body2'
          gutterBottom
        >
          body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
          blanditiis tenetur unde suscipit, quam beatae rerum inventore
          consectetur, neque doloribus, cupiditate numquam dignissimos laborum
          fugiat deleniti? Eum quasi quidem quibusdam.
        </Typography>
        <Typography
          variant='button'
          display='block'
          gutterBottom
        >
          button text
        </Typography>
        <Typography
          variant='caption'
          display='block'
          gutterBottom
        >
          caption text
        </Typography>
        <Typography
          variant='overline'
          display='block'
          gutterBottom
        >
          overline text
        </Typography>
      </Stack>
    </div>
  );
};
