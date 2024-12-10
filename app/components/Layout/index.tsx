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

import { AppBar, Container, Grid2 as Grid } from '@mui/material';
import { MemberBar } from '@/components/Layout/MemberBar/MemberBar';
import { Header } from '@/components/Layout/Header';
import { Breadcrumbs } from '@/components/Layout/Breadcrumbs/Breadcrumbs';
import { NavigationLoader } from '@/components/NavigationLoader/NavigationLoader';
import { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <>
      <AppBar
        position='static'
        color='default'
      >
        <NavigationLoader />
        <MemberBar color='#efefef'>
          <p>AppBar</p>
        </MemberBar>
        <Header />
      </AppBar>
      <Container
        maxWidth='xl'
        sx={{ minHeight: '100vh' }}
      >
        <Grid container>
          <Grid
            size={12}
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
            size={3}
            display={{ xs: 'none', sm: 'none', md: 'block' }}
          >
            <aside id='sidebar-content' />
          </Grid>
          <Grid
            sx={{ paddingBottom: '64px' }}
            size={9}
          >
            <main>{children}</main>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
