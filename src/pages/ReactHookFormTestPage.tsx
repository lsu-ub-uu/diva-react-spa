import React, { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InfoIcon from '@mui/icons-material/Info';
import { Card, Tooltip } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { publicationTypeSelector } from '../features/publicationTypes/selectors';
import { loadPublicationTypesAsync } from '../features/publicationTypes/actions';

const TooltipHelperIcon = () => {
  return (
    <Tooltip
      title='A title for the tooltip'
      body='Content of tooltip help Content help content of this component'
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

export const ReactHookFormTestPage = () => {
  const dispatch = useAppDispatch();
  const publicationTypeState = useAppSelector(publicationTypeSelector);

  useEffect(() => {
    dispatch(loadPublicationTypesAsync());
  }, [dispatch]);

  return (
    <div>
      <Card
        title='Författare 1'
        variant='variant1'
        tooltipTitle='Add author help'
        tooltipBody='Here goes some text about how to add author'
      >
        <pre>
          {JSON.stringify(publicationTypeState.publicationTypes, null, 1)}
        </pre>
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
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel required>Förnamn</FormLabel>
              <TextField
                variant='outlined'
                required
                placeholder='Skriv in förnamn'
                name='firstname'
                id='firstname'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel required>Efternamn</FormLabel>
              <TextField
                variant='outlined'
                required
                placeholder='Skriv in efternamn'
                name='lastname'
                id='lastname'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel error>
                <Stack
                  spacing={1}
                  direction='row'
                  alignItems='center'
                >
                  <Typography>Lokal användaridentitet</Typography>
                  <TooltipHelperIcon />
                </Stack>
              </FormLabel>
              <TextField
                variant='outlined'
                error
                value='erik.m.lundin@ub.uu.se'
                name='localUserId'
                id='localUserId'
                helperText='Some error text'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel>ORCID-identitet</FormLabel>
              <TextField
                placeholder='XXXX-XXXX-XXXX-XXXX'
                variant='outlined'
                name='localUserId'
                id='localUserId'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel>&nbsp;</FormLabel>
              <Button
                variant='outlined'
                type='submit'
                disableRipple
                endIcon={<ExitToAppIcon />}
              >
                Skapa ORCID-ID
              </Button>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FormControl sx={{ mb: 2, width: '100px' }}>
              <FormLabel>Födelseår</FormLabel>
              <TextField
                type='number'
                placeholder='ÅÅÅÅ'
                variant='outlined'
                name='birthYear'
                id='birthYear'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel>Institution, avdelning eller program</FormLabel>
              {/* eslint-disable-next-line react/no-unstable-nested-components */}
              <Select
                value={20}
                IconComponent={(props) => <ExpandMoreIcon {...props} />}
              >
                <MenuItem
                  disableRipple
                  value={10}
                >
                  Stockholms Universitet
                </MenuItem>
                <MenuItem
                  disableRipple
                  value={20}
                >
                  Uppsala
                </MenuItem>
                <MenuItem
                  disableRipple
                  value={30}
                >
                  Test
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel>Forskargrupp</FormLabel>
              <TextField
                placeholder=''
                variant='outlined'
                name='researchGroup'
                id='researchGroup'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel>E-postadress</FormLabel>
              <TextField
                type='email'
                placeholder=''
                variant='outlined'
                name='researchGroup'
                id='researchGroup'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <FormControl
              fullWidth
              sx={{ mb: 2 }}
            >
              <FormLabel>Annan organisation</FormLabel>
              <TextField
                placeholder=''
                variant='outlined'
                name='otherOrganisation'
                id='otherOrganisation'
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Button
              type='submit'
              disableRipple
              endIcon={<CheckIcon />}
            >
              Spara personuppgifter
            </Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};
