import { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AsidePortal } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getRecordTypeByName } from '../features/recordType/recordTypeSlice';
import { getOneForm } from '../features/form/formSlice';
import {
  Card,
  Select,
  useBackdrop,
  ErrorSummary,
  ResearchSubjectPicker,
} from '../components';

export const FormGenPage = () => {
  // const { setBackdrop } = useBackdrop();
  const dispatch = useAppDispatch();

  const { form, isLoading, isError, message } = useAppSelector(
    (state) => state.form,
  );
  const [id, setId] = useState('');
  useEffect(() => {
    if (isError) {
      console.log('error message', message);
    }
    if (id !== '') {
      dispatch(getOneForm(id));
    }
  }, [isError, message, dispatch, id]);

  const handleInput = (e: React.MouseEvent<HTMLElement>): void => {
    const inputValue = (
      document.getElementById('formGetter') as HTMLInputElement
    ).value;
    e.preventDefault();
    console.log(inputValue);
    if (inputValue !== '' || inputValue !== undefined || inputValue !== null) {
      setId(inputValue);
    }
  };

  const inputType = (type: {}) => {
    console.log('iT', type);
  };

  console.log('aa', form);
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <AsidePortal>
        <p>form-gen</p>
      </AsidePortal>
      <div>
        <h2>Lägg till publikation – Fyll i uppgifter</h2>

        <form>
          <TextField id='formGetter' />
          <Button
            size='small'
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
          {isLoading || message === '' ? (
            Object.values(form.cards).map((formPart: any, i) => {
              // console.log(formPart);

              return (
                <Card
                  key={i}
                  title={formPart.name.sv}
                  variant='variant6'
                  tooltipTitle='Title'
                  tooltipBody='Here goes some text about how choose type'
                >
                  Cards
                  {formPart.children.forEach((child: any) => {
                    inputType(child);
                  })}
                </Card>
              );
            })
          ) : (
            <p>{message}</p>
          )}
        </form>
      </div>
    </Box>
  );
};
