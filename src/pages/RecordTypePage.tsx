import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AsidePortal } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getRecordTypeByName } from '../features/recordType/recordTypeSlice';

export const RecordTypePage = () => {
  // const { setBackdrop } = useBackdrop();
  const dispatch = useAppDispatch();

  const { recordType, isLoading, isError, message } = useAppSelector(
    (state) => state.recordType,
  );
  const [id, setId] = useState('recordType');
  useEffect(() => {
    if (isError) {
      console.log('error message', message);
    }

    dispatch(getRecordTypeByName(id));
  }, [isError, message, dispatch, id]);

  const handleInput = (e: React.MouseEvent<HTMLElement>): void => {
    const inputValue = (document.getElementById('test') as HTMLInputElement)
      .value;
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
