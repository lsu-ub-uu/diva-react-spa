import { useState, MouseEvent } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { dummyLoginAsync } from '../../../features/auth/actions';
import { logout } from '../../../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useBackdrop } from '../../Backdrop/BackdropContext';
import { authStateSelector } from '../../../features/auth/selectors';

interface DummyAccount {
  alias: string;
  userId: string;
  appToken: string;
}

const dummyAccounts: DummyAccount[] = [
  {
    alias: 'DivaEverything',
    userId: 'coraUser:490742519075086',
    appToken: '2e57eb36-55b9-4820-8c44-8271baab4e8e',
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
    account: DummyAccount,
  ) => {
    console.log(account);
    event.preventDefault();
    setBackdrop(true);
    // pass DummyAccount
    dispatch(dummyLoginAsync(() => setBackdrop(false)));
    handleClose();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      {authState.userSession !== null ? (
        <Avatar
          alt='Logout user'
          onClick={handleLogout}
        >
          <PersonIcon />
        </Avatar>
      ) : (
        <>
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
                {dummyAccount.alias}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </div>
  );
};
