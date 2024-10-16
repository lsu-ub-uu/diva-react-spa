/*
 * Copyright 2023 Uppsala University Library
 *
 * This file is part of DiVA Client.
 *
 *     DiVA Client is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     DiVA Client is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 */

import { Box, Button, Container, Grid, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import CachedIcon from '@mui/icons-material/Cached';
import { Link as RouterLink } from 'react-router-dom';
import { Login } from './Login/Login';
import divaLogo from '@/assets/divaLogo.svg';

export const Header = () => {
  const { i18n } = useTranslation();
  return (
    <Box
      sx={{ py: 2, borderBottom: '1px solid #eee', backgroundColor: '#fff' }}
    >
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={2}
          direction='row'
          justifyContent='space-between'
          alignItems='flex-start'
        >
          <Grid item>
            <Link
              component={RouterLink}
              to='/'
            >
              <img
                src={divaLogo}
                className='logo'
                alt='logo'
                style={{ width: 160 }}
              />
            </Link>
          </Grid>
          <Grid
            item
            xs
          />
          <Grid item>
            <Button
              onClick={() => {
                axios.get('/refreshDefinitions').then(() => {
                  location.reload();
                });
              }}
            >
              Refresh Def <CachedIcon />
            </Button>
            <Button onClick={() => i18n.changeLanguage('sv')}>Svenska</Button>
            <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
          </Grid>
          <Grid item>
            <Login />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
