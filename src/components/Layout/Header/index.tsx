import { Avatar, Box, Button, Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import logo from './divaLogo.svg';

export const Header = () => {
  const { i18n } = useTranslation();

  return (
    <Box
      sx={{ py: 2, borderBottom: '1px solid #eee', backgroundColor: '#fff' }}
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
          <Grid item>
            <Button onClick={() => i18n.changeLanguage('sv')}>Svenska</Button>
            <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
          </Grid>
          <Grid item>
            <Avatar>EL</Avatar>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
