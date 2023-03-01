import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Alert, Divider, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TabsMenu } from '../components/TabsMenu/TabsMenu';
import { AsidePortal, CustomTooltip, Dialog } from '../components';

export const HomePage = () => {
  const { t } = useTranslation();

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
        <CustomTooltip
          title='A title for the tooltip'
          body='Content of tooltip help content of tooltip help content of tooltip p help content of tooltip help content of this component'
        />
      </Stack>
      <Divider>Message Alerts</Divider>
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
      <Stack spacing={2}>
        <Alert severity='error'>This is an error alert</Alert>
        <Alert severity='warning'>This is a warning alert</Alert>
        <Alert severity='info'>This is an info alert</Alert>
        <Alert severity='success'>This is a success alert</Alert>
      </Stack>
      <Divider>Typography - (Helvetica)</Divider>
      <Stack spacing={2}>
        <Typography
          variant='h1'
          gutterBottom
        >
          h1. Heading
        </Typography>
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
