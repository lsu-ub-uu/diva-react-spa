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

import { Container, Grid, AppBar } from '@mui/material';
import { Outlet } from '@remix-run/react';
import { MemberBar } from '@/webapp/components/Layout/MemberBar/MemberBar';
import { Header } from '@/webapp/components/Layout/Header';
import { Breadcrumbs } from '@/webapp/components/Layout/Breadcrumbs/Breadcrumbs';

export const Layout = () => {
  return (
    <>
      <AppBar
        position='static'
        color='default'
      >
        <MemberBar color='#efefef'>
          <p>AppBar</p>
        </MemberBar>
        <Header />
      </AppBar>
      <Container
        maxWidth='lg'
        sx={{ minHeight: '100vh' }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ pt: 2, pb: 4 }}
          >
            <Breadcrumbs />
          </Grid>
        </Grid>
        <Grid
          container
          columnSpacing={{ md: 4 }}
        >
          <Grid
            item
            style={{ width: '300px' }}
            display={{ xs: 'none', sm: 'none', md: 'block' }}
          >
            <aside id='sidebar-content' />
          </Grid>
          <Grid
            item
            xs
            sx={{ paddingBottom: '64px' }}
          >
            <main>
              <Outlet />
            </main>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
