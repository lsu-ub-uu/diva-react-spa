import { Outlet } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Header } from './Header';
import { Breadcrumbs } from './Breadcrumbs/Breadcrumbs';

export const Layout = () => {
  return (
    <>
      <AppBar
        position='static'
        color='default'
        sx={{ py: 2 }}
      >
        <Container maxWidth='lg'>app bar</Container>
      </AppBar>
      <Header />
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
