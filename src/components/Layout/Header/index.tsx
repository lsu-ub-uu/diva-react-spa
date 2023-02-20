import AppBar from '@mui/material/AppBar';
import { Container, Grid } from '@mui/material';
import logo from './divaLogo.svg';

export const Header = () => {
  return (
    <AppBar
      position='static'
      color='transparent'
      sx={{ py: 2, borderBottom: '1px solid #eee' }}
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
            <img
              src={logo}
              className='logo'
              alt='logo'
              style={{ width: 160 }}
            />
          </Grid>
          <Grid
            item
            xs
          />
          <Grid item>language select</Grid>
          <Grid item>some name - login</Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};
