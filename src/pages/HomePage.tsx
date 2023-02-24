import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Alert, Divider, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TabsMenu } from '../components/TabsMenu/TabsMenu';
import { AsidePortal, CustomTooltip, DivaDialog } from '../components';

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
      <DivaDialog />
      <Stack spacing={2}>
        <Alert severity='error'>This is an error alert</Alert>
        <Alert severity='warning'>This is a warning alert</Alert>
        <Alert severity='info'>This is an info alert</Alert>
        <Alert severity='success'>This is a success alert</Alert>
      </Stack>
    </div>
  );
};