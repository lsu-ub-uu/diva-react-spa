import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, IconButton, styled } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  backgroundColor: '#d6e7f3',
  mx: theme.spacing(4),
  py: theme.spacing(1),
  minHeight: theme.spacing(1 / 2),
  borderBottom: '2px solid #5388c0',
}));

const StyledCardContent = styled(CardContent)(({ theme }) => {
  return {
    backgroundColor: '#ececec',
    padding: theme.spacing(4),
    borderRadius: 0,

    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  };
});

export default function CardDemo() {
  return (
    <Card sx={{ maxWidth: '100%', borderRadius: 0 }}>
      <StyledCardHeader
        action={
          <IconButton aria-label='settings'>
            <ShareIcon />
          </IconButton>
        }
        title={<Typography variant='h5'>Card header</Typography>}
      />
      <StyledCardContent>
        <Typography variant='body1'>Card content can be anything</Typography>
      </StyledCardContent>
    </Card>
  );
}
