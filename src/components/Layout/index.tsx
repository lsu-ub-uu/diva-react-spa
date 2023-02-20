import { Outlet, Link as RouterLink } from 'react-router-dom';
import { Breadcrumbs, Container, Grid, Link } from '@mui/material';
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
            sx={{ pt: 2, pb: 4 }}
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
            <aside style={{ backgroundColor: '#fff' }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </aside>
          </Grid>
          <Grid
            item
            xs
          >
            <main style={{ backgroundColor: '#ececec' }}>
              <Outlet />
            </main>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
