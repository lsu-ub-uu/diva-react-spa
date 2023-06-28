import React, { Key, useEffect, useState } from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import { AsidePortal, Card } from '../components';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOneForm } from '../features/form/formSlice';
import { Tooltip } from '../components/Tooltip/Tooltip';

export interface InfoButtonProps {
  title: string;
  body: string;
}

const InfoButton = (props: InfoButtonProps) => {
  return (
    <Tooltip
      title={props.title}
      body={props.body}
    >
      <IconButton
        disableRipple
        color='info'
        aria-label='info'
      >
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

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

  // console.log('aa', form);
  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <AsidePortal>
        <p>form-gen</p>
      </AsidePortal>
      <div>
        <h2>Lägg till publikation – Fyll i uppgifter</h2>

        <form>
          <Card
            title='Change Publication Type'
            variant='variant6'
            tooltipTitle='Title'
            tooltipBody=''
          >
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
          </Card>
          {isLoading || message === '' ? (
            Object.values(form.cards).map((formPart: any, i) => {
              // console.log(formPart);

              return (
                <Card
                  key={i}
                  title={formPart.name.sv}
                  variant='variant6'
                  tooltipTitle='Title'
                  tooltipBody={formPart?.deftext?.sv}
                >
                  {formPart.children.map((child: any) => {
                    switch (child.type) {
                      case 'select':
                        return (
                          <React.Fragment key={child.name}>
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
                          </React.Fragment>
                        );
                      case 'input':
                        return (
                          <React.Fragment key={child.name}>
                            <label htmlFor={child.name}>
                              {child.label?.sv}
                            </label>
                            <input
                              pattern={child.regex}
                              id={child.name}
                            />
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );
                      case 'textarea':
                        return (
                          <React.Fragment key={child.name}>
                            <label htmlFor={child.name}>
                              {child.label?.sv}
                            </label>
                            <textarea
                              // pattern={child.regex}
                              id={child.name}
                            />
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );
                      case 'button':
                        return (
                          <React.Fragment key={child.name}>
                            <button type='button'>{child.label?.sv}</button>
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );
                      case 'radio':
                        return (
                          <React.Fragment key={child.name}>
                            {child.deftext?.sv ? (
                              <i>{child.deftext?.sv}</i>
                            ) : null}
                            {child.children.map((options: any) => {
                              console.log(child);

                              return (
                                <React.Fragment key={options.value}>
                                  <input
                                    type='radio'
                                    id={options.value}
                                    name={child.name}
                                  />
                                  <label htmlFor={options.value}>
                                    {options.name?.sv}
                                  </label>
                                  {child.deftext?.sv ? (
                                    <InfoButton
                                      title=''
                                      body={child?.deftext?.sv}
                                    />
                                  ) : null}
                                </React.Fragment>
                              );
                            })}
                          </React.Fragment>
                        );
                      case 'checkbox':
                        return (
                          <React.Fragment key={child.name}>
                            <input
                              id={child.name}
                              type='checkbox'
                            />
                            <label htmlFor={child.name}>
                              {child.label?.sv}
                            </label>
                            {child.deftext?.sv ? (
                              <InfoButton
                                title=''
                                body={child?.deftext?.sv}
                              />
                            ) : null}
                          </React.Fragment>
                        );
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
