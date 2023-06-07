import { useState, MouseEvent } from 'react';
import { Avatar, Button, Menu, MenuItem, Stack, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { dummyLoginAsync } from '../../../features/auth/actions';
import { logout } from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useBackdrop } from '../../Backdrop/BackdropContext';
import { authStateSelector } from '../../../features/auth/selectors';

export interface Account {
  appToken: string;
  id?: string;
  validForNoSeconds: string;
  idInUserStorage: string;
  idFromLogin: string;
  lastName: string;
  firstName: string;
}

const dummyAccounts: Account[] = [
  {
    appToken: '0c240296-0315-4e48-a991-4e6350e73413',
    validForNoSeconds: '600',
    idInUserStorage: 'coraUser:491055276494310',
    idFromLogin: 'coraUser:491055276494310',
    lastName: 'Admin',
    firstName: 'System',
  },
];

export const Login = (): JSX.Element => {
  const { setBackdrop } = useBackdrop();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const authState = useAppSelector(authStateSelector);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = (
    event: MouseEvent<HTMLElement>,
    account: Account,
  ) => {
    event.preventDefault();
    setBackdrop(true);
    dispatch(dummyLoginAsync(account, () => setBackdrop(false)));
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {authState.userSession !== null ? (
        <Stack
          direction='row'
          spacing={2}
          alignItems='center'
        >
          <Box>
            {authState.userSession.firstName}
            {authState.userSession.lastName}
          </Box>
          <Avatar
            alt='Logout user'
            onClick={handleLogout}
          >
            <PersonIcon />
          </Avatar>
        </Stack>
      ) : (
        <Stack>
          <Button onClick={handleClick}>Log in</Button>
          <Menu
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            id='login-dropdown-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {dummyAccounts.map((dummyAccount, index) => (
              <MenuItem
                key={index}
                onClick={(event) => handleSelection(event, dummyAccount)}
              >
                diva{dummyAccount.firstName}
                {dummyAccount.lastName}
              </MenuItem>
            ))}
          </Menu>
        </Stack>
      )}
    </div>
  );
};
