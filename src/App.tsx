import './App.css';
import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';

function App() {
  return (
    <>
      <AppBar
        position='fixed'
        sx={{ backgroundColor: '#75598E' }}
      >
        <Toolbar>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
          >
            DiVA
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth='lg'>
        <Box sx={{ my: 4 }}>
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
              href='/'
            >
              Page 2
            </Link>
            <Typography color='text.primary'>Breadcrumbs</Typography>
          </Breadcrumbs>
          <Typography
            variant='h5'
            component='h1'
            gutterBottom
          >
            Digitala Vetenskapliga Arkivet
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              disableRipple
              value={0}
              aria-label='basic tabs example'
            >
              <Tab label='Item One' />
              <Tab label='Item Two' />
              <Tab label='Item Three' />
            </Tabs>
          </Box>
          <Typography
            sx={{ mt: 6, mb: 3 }}
            color='text.secondary'
          >
            Some secondary text
          </Typography>
          <Button
            disableRipple
            variant='contained'
            color='primary'
          >
            Primary
          </Button>
          <Button
            disableRipple
            variant='outlined'
            color='secondary'
          >
            Secondary
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;
