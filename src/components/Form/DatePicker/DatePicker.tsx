import React, { useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  DatePicker as MuiDatePicker,
  DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import 'dayjs/locale/en-gb';

interface ExtendedDatePickerProps extends DatePickerProps {
  defaultValue?: string;
  locale?: string;
}

export const DatePicker = React.forwardRef(
  (props: ExtendedDatePickerProps, ref) => {
    const [locale, setLocale] = useState<string>(
      props.locale ? props.locale : 'sv',
    );

    return (
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale={locale}
      >
        <MuiDatePicker
          ref={ref}
          defaultValue={props.defaultValue ? dayjs(props.defaultValue) : null}
          slotProps={{
            actionBar: { actions: ['today', 'clear'] },
          }}
        />
      </LocalizationProvider>
    );
  },
);
