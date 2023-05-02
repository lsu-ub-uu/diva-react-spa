import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useSelector, useDispatch } from 'react-redux';
import { AsidePortal, useBackdrop } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  getRecordTypeByName,
  reset,
} from '../features/recordType/recordTypeSlice';

export const RecordTypePage = () => {
  const { setBackdrop } = useBackdrop();
  const dispatch = useDispatch();

  const { recordType, isLoading, isError, message } = useSelector(
    (state) => state.recordType,
  );
  const [id, setId] = useState('recordType');
  useEffect(() => {
    if (isError) {
      console.log('error message', message);
    }

    dispatch(getRecordTypeByName(id));
  }, [isError, message, dispatch, id]);

  const handleInput = (e) => {
    const inputValue = document.getElementById('test').value;
    e.preventDefault();
    console.log(inputValue);
    if (inputValue !== '' || inputValue !== undefined || inputValue !== null) {
      setId(inputValue);
    }
  };

  if (isLoading) {
    // return <Spinner />;
  }

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <AsidePortal>
        <p>Aside</p>
      </AsidePortal>
      <div>
        <h2>recordtype</h2>

        {isLoading || message === '' ? (
          Object.values(recordType).map((one: any, i) => {
            return <p key={i}>{one.id}</p>;
          })
        ) : (
          <p>{message}</p>
        )}
        <form>
          <TextField id='test' />
          <Button
            type='submit'
            disableRipple
            variant='contained'
            endIcon={<ArrowForwardIcon />}
            onClick={(e) => {
              handleInput(e);
            }}
          >
            Change Publication Type
          </Button>
        </form>
      </div>
    </Box>
  );
};
