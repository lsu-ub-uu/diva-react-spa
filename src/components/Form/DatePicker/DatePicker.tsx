import React, { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import 'dayjs/locale/sv';
import 'dayjs/locale/en-gb';

interface ExtendedDatePickerProps extends DatePickerProps<Date> {
  locale?: string;
}

export const DatePicker = React.forwardRef(
  (
    props: ExtendedDatePickerProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { locale, ...other } = props;

    const [dateLocale, setDateLocale] = useState<string>(
      props.locale ? props.locale : 'sv',
    );
    const [value, setValue] = useState<Date | null>(null);
    useEffect(() => {
      setDateLocale(locale ?? 'sv');
    }, [locale]);

    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={dateLocale}
      >
        <MuiDatePicker
          {...other}
          inputRef={ref}
          slotProps={{
            actionBar: { actions: ['today', 'clear'] },
            desktopPaper: {
              sx: {
                border: '2px solid #000000',
                '.MuiPickersDay-root.MuiPickersDay-today': {
                  border: '1px solid #613985',
                },
                '.MuiPickersDay-root.Mui-selected': {
                  color: '#ffffff',
                  backgroundColor: '#613985',
                },
              },
            },
          }}

          /* value={value}
          onChange={(newValue) => setValue(newValue)} */
        />
      </LocalizationProvider>
    );
  },
);
