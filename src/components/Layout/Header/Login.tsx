import { useState, MouseEvent } from 'react';
import { Avatar, Button, Menu, MenuItem } from '@mui/material';

export const Login = (): JSX.Element => {
  const [authenticated, setAuthenticated] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelection = () => {
    handleClose()
  };

  return (
    <div>
      {authenticated ? (
        <Avatar onClick={() => setAuthenticated(false)}>EL</Avatar>
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
            <MenuItem onClick={handleSelection}>TestUser1</MenuItem>
            <MenuItem onClick={handleSelection}>TestDivaEverything</MenuItem>
            <MenuItem onClick={handleSelection}>SomeHardcodedUser</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};
