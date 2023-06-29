import React, { Key, useEffect, useState } from 'react';
import { Box, Button, TextField, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getOneForm } from '../features/form/formSlice';
import { AsidePortal, Card } from '../components';
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
  const { t } = useTranslation();

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
  console.log('aa', form);
  const translationsEN: any = {};
  const translationsSV: any = {};
  const translationsEnFn = () => {};
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
              translationsEN[`${formPart.id}`] = formPart.name.en;
              translationsSV[`${formPart.id}`] = formPart.name.sv;
              console.log(translationsEN, translationsSV);

              i18n.addResources('en', 'form', translationsEN);
              i18n.addResources('sv', 'form', translationsSV);
              // console.log('i', i18n.store.data);
              return (
                <Card
                  key={i}
                  title={t(formPart.id as string, { ns: 'form' })}
                  // title={t(`${formPart.name.sv}`, 'aaa')}
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
                              {child &&
                                child.children.map(
                                  (options: any, j: Key | null | undefined) => {
                                    if (options.value !== '') {
                                      translationsEN[`${options.value}`] =
                                        options.name?.en;
                                      translationsSV[`${options.value}`] =
                                        options.name?.sv;
                                    }

                                    return (
                                      <option
                                        value={options.value}
                                        key={j}
                                      >
                                        {/* {options.name.sv} */}
                                        {t(options.value as string, {
                                          ns: 'form',
                                        })}
                                      </option>
                                    );
                                  },
                                )}
                            </select>
                          </React.Fragment>
                        );
                      case 'input':
                        translationsEN[`${child.name}`] = child.label?.en;
                        translationsSV[`${child.name}`] = child.label?.sv;
                        return (
                          <React.Fragment key={child.name}>
                            <label htmlFor={child.name}>
                              {t(child.name as string, { ns: 'form' })}
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
