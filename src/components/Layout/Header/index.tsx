import AppBar from '@mui/material/AppBar';
import { Container } from '@mui/material';
import logo from './divaLogo.svg';

export const Header = () => {
  return (
    <AppBar
      position='static'
      color='transparent'
      sx={{ py: 2, borderBottom: '1px solid #eee' }}
    >
      <Container maxWidth='lg'>
        <img
          src={logo}
          className='logo'
          alt='logo'
          style={{ width: 160 }}
        />
      </Container>
    </AppBar>
  );
};
