import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';
import { MemberBar } from './MemberBar/MemberBar';

export const Layout = () => {
  return (
    <>
      <Helmet>
        <title>DiVA</title>
      </Helmet>
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
