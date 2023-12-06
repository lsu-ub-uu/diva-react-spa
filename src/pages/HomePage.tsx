import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Grid, MenuItem, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import React from 'react';
import { AsidePortal, Card, Select } from '../components';

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('start')} | DiVA</title>
      </Helmet>
      <div>
        <AsidePortal>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac
            mattis metus. Quisque condimentum cursus egestas. Suspendisse tellus
            dolor, euismod at dui a, ultrices tempor erat.
          </p>
        </AsidePortal>
        <Stack spacing={2}>
          <Card
            title='Skapa publikation'
            variant='variant1'
            tooltipTitle='Publication'
            tooltipBody='Publications help body text tooltip'
          >
            <Grid
              container
              spacing={2}
              justifyContent='space-between'
              alignItems='flex-start'
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <Select
                  name='publication-select'
                  size='small'
                  value='manuscript'
                  loading={false}
                  fullWidth
                >
                  <MenuItem
                    value='manuscript'
                    disableRipple
                  >
                    Manuskript i avhandling
                  </MenuItem>
                </Select>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
              >
                <Button
                  disableRipple
                  variant='contained'
                  component={RouterLink}
                  to='/create/record/manuscript'
                  endIcon={<ArrowForwardIcon />}
                >
                  Fortsätt
                </Button>
              </Grid>
            </Grid>
          </Card>
          <Card
            title='Editera manuskript'
            variant='variant2'
            tooltipTitle='test'
            tooltipBody='test'
          >
            <Button
              disableRipple
              variant='text'
              component={RouterLink}
              to='/update/record/divaOutput:519333261463755'
            >
              Editera divaOutput:519333261463755
            </Button>
          </Card>
        </Stack>
      </div>
    </>
  );
};
