import { Outlet } from 'react-router-dom';
import { Breadcrumbs, Container, Grid, Link, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { Header } from './Header';

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
          >
            <Breadcrumbs aria-label='breadcrumb'>
              <Link
                underline='hover'
                color='inherit'
                href='/'
              >
                Start
              </Link>
              <Link
                underline='hover'
                color='inherit'
                href='/material-ui/getting-started/installation/'
              >
                Undersida
              </Link>
              <Typography color='text.primary'>en sida till</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <main style={{ backgroundColor: 'yellow' }}>
              <Outlet />
            </main>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
