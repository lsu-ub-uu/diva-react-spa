import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AsidePortal, useBackdrop } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  integrationTestSelector,
  loadIntegrationTestAsync,
} from '../features/integrationTest';

export const IntegrationPage = () => {
  const { setBackdrop } = useBackdrop();
  const dispatch = useAppDispatch();
  const integrationTestSelectorState = useAppSelector(integrationTestSelector);

  const [input, setInput] = useState(null);

  /*   const handleInput = (e) => {
    const inputValue = document.getElementById('test').value;
    e.preventDefault();
    setInput(inputValue);
  }; */
  useEffect(() => {
    setBackdrop(true);
    console.log('input', input);
    dispatch(loadIntegrationTestAsync(() => input));
    dispatch(loadIntegrationTestAsync(() => setBackdrop(false)));
  }, [dispatch, setBackdrop, input]);
  console.log(integrationTestSelectorState.integration);
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <AsidePortal>
        <p>Aside</p>
      </AsidePortal>
      <div>
        <h2>IntegrationPage</h2>
        {/*         <form>
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
        </form> */}
        <p>{integrationTestSelectorState.integration.id}</p>
        {integrationTestSelectorState.integration.map((each, i) => {
          return <p key={i}>{each.id}</p>;
        })}
        {/* <p>{input}</p> */}
        {/* {console.log('aaaaa', integrationTestSelectorState)} */}
      </div>
    </Box>
  );
};
