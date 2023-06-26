import { Key, useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AsidePortal, Card } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOneForm } from '../features/form/formSlice';

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
    // console.log(inputValue);
    if (inputValue !== '' || inputValue !== undefined || inputValue !== null) {
      setId(inputValue);
    }
  };

  // const inputType = (child: { type: string }) => {
  // };

  // console.log('aa', form);
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
                  {formPart.children.map((child: any) => {
                    switch (child.type) {
                      case 'select':
                        return (
                          <>
                            <label htmlFor={child.name}>
                              {child.label?.sv}
                            </label>
                            <select>
                              {child.children.map(
                                (options: any, j: Key | null | undefined) => {
                                  return (
                                    <option
                                      value={options.value}
                                      key={j}
                                    >
                                      {options.name?.sv}
                                    </option>
                                  );
                                },
                              )}
                            </select>
                          </>
                        );
                      case 'input':
                        return (
                          <>
                            <label htmlFor={child.name}>
                              {child.label?.sv}
                            </label>
                            <input
                              pattern={child.regex}
                              id={child.name}
                            />
                          </>
                        );
                      case 'button':
                        return <button type='button'>{child.label?.sv}</button>;
                      default:
                        return null;
                    }
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
