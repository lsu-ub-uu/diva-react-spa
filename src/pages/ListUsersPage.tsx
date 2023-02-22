import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadDummyDataAsync } from '../features/dummy/actions';
import { dummySelector } from '../features/dummy/selectors';

export const ListUsersPage = () => {
  const dispatch = useAppDispatch();
  const dummyState = useAppSelector(dummySelector);

  useEffect(() => {
    dispatch(loadDummyDataAsync());
  }, [dispatch]);

  if (dummyState.isLoading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );

  return (
    <List>
      {dummyState.users.map((user) => {
        const labelId = `user-${user.id}`;
        return (
          <ListItem
            key={user.id}
            disablePadding
          >
            <ListItemText
              id={labelId}
              primary={user.lastname}
              secondary={user.firstname}
            />
          </ListItem>
        );
      })}
    </List>
  );
};
