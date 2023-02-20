import { Outlet, Link as RouterLink } from 'react-router-dom';
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
            sx={{ pt: 1, pb: 4 }}
          >
            <Breadcrumbs aria-label='breadcrumb'>
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to='/'
              >
                Start
              </Link>
              <Link
                underline='hover'
                color='inherit'
                component={RouterLink}
                to='/about'
              >
                About
              </Link>
              <Link
                underline='hover'
                color='text.primary'
                component={RouterLink}
                to='/about/tech'
                aria-current='page'
              >
                Tech
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid
            item
            style={{ width: '300px', backgroundColor: '#eee' }}
            display={{ xs: 'none', sm: 'block' }}
          >
            <aside>side</aside>
          </Grid>
          <Grid
            item
            xs
            style={{ backgroundColor: 'yellow' }}
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
